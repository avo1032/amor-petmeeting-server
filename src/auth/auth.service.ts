import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AwsS3Service } from 'src/aws/services/aws.s3.service';
import { SignInReqDto, SignUpReqDto } from 'src/user/dto/req.user.dto';
import * as argon2 from 'argon2';
import { createUUIDv4 } from 'src/common/utils/create.uuid';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from 'src/user/repositories/refresh.token.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
import { RefreshToken } from 'src/user/entities/refresh.token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async signUp(body: SignUpReqDto) {
    const { profileImage, password, ...userData } = body;
    const isExistUser = await this.userRepository.findOneByEmail(
      userData.email,
    );

    if (!!isExistUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    let profileImageUrl;
    if (!!profileImage) {
      const profileImageKey = `profiles/${createUUIDv4()}`;
      profileImageUrl = (
        await this.awsS3Service.uploadFile(profileImage, profileImageKey)
      ).Location;
    } else {
      profileImageUrl = process.env.DEFAULT_PROFILE_IMAGE_URL;
    }
    const hashedPassword = await this.hashData(password);

    const user = Object.assign(new User(), {
      ...userData,
      uuid: createUUIDv4(),
      password: hashedPassword,
      lastActivatedAt: new Date(),
      profileImage: profileImageUrl,
    });
    await this.userRepository.save(user);

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async signIn(body: SignInReqDto) {
    const user = await this.userRepository.findOneByEmail(body.email);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const passwordMatched = await argon2.verify(user.password, body.password);
    if (!passwordMatched) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async generateTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '15m',
          secret: process.env.ACCESS_TOKEN_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '7d',
          secret: process.env.REFRESH_TOKEN_SECRET,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const generatedToken = Object.assign(new RefreshToken(), {
      user,
      refreshToken: hashedRefreshToken,
    });
    await this.refreshTokenRepository.save(generatedToken);
  }

  async refreshTokens(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOneById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatched = await argon2.verify(
      user.refreshToken.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatched) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.generateTokens(user.id, user.email);
    return tokens;
  }
}
