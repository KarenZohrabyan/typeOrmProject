import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
              expiresIn: 3600,
            }
        })
    ]
})
export class AuthModule {}