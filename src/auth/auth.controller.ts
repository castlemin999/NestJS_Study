import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  // 회원가입
  @Post('/signup')
  signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }

  // 로그인
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.authService.singIn(authCredentialsDto);
  }

}
