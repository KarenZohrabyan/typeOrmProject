import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./payload/jwt.payload";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    public async generateToken(email: string): Promise<string> {
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return accessToken;
    }
}