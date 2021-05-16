import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserEntity } from "src/user/entity/user.pg.entity";
import { UserRepository } from "src/user/repo/user.repository";
import { JwtPayload } from "../payload/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
            ignoreExpiration: false
        })
    }

    async validate(payload: JwtPayload){
        const { email, role } = payload;
        return { email: email, role: role };
    }
}