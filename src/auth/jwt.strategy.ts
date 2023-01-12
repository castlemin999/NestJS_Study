import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userRepository: UserRepository
  ){
    super({
      secretOrKey: 'Secret1234', // Token과 같은 SecretKey, Token이 유효한지 확인
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Token이 어디서 오는지 확인
    });
  }

  async validate(payload){
    const { username } = payload;
    const user: User = await this.userRepository.findOne({where: {username}});

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}