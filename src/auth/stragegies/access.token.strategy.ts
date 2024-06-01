import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/repositories/user.repository';

type JwtPayload = {
  sub: number;
  userEmail: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userRepository.findOneById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 사용자입니다.');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
}
