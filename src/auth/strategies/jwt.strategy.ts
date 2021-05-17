import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserRepository } from "src/user/repo/user.repository";
import { JwtPayload } from "../payload/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
            ignoreExpiration: false
        })
    }

    async validate(payload: JwtPayload){
        const { email, role } = payload;
        const user = this.userRepository.findOne({email : email});
        if(!user) {
            throw new BadRequestException('There is no user with that credentials');
        }
        return user;
    }
}