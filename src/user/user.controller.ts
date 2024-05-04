import { Body, Controller, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService } from 'src/auth/auth.service';
import { SignUpReqDto } from './dto/req.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @FormDataRequest()
  async signUp(@Body() body: SignUpReqDto) {
    return this.authService.signUp(body);
  }
}
