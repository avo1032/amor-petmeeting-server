import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService } from 'src/auth/auth.service';
import { SignUpReqDto } from './dto/req.user.dto';
import { RefreshTokenGuard } from 'src/common/guards/refresh..token';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @FormDataRequest()
  async signUp(@Body() body: SignUpReqDto) {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignUpReqDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(refreshToken, userId);
  }
}
