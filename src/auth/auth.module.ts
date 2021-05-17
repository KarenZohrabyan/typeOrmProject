import { forwardRef, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user/repo/user.repository";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
              expiresIn: 3600,
            }
        })
    ],
    exports: [AuthService, JwtModule, PassportModule],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}