import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/utility/enums/role.enum";
import { JwtPayload } from "./payload/jwt.payload";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    public async generateToken(email: string, role: Role): Promise<string> {
        const payload: JwtPayload = { email, role };
        const accessToken = await this.jwtService.sign(payload);
        return accessToken;
    }
}