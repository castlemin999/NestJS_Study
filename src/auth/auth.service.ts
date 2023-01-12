import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService : JwtService
  ){}

  // 회원가입
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  // 로그인
  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{

    const{username, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({where: {username}});
    
    if(user && (await bcrypt.compare(password, user.password))){

      // 유저 토큰 생성 ( Secret + Payload )
      const payLoad = { username };
      const accessToken = await this.jwtService.sign(payLoad);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
    
  }

  
}
