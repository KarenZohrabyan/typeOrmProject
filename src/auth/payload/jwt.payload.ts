import { Role } from "src/utility/enums/role.enum";

export interface JwtPayload {
    email: string;
    role: Role;
}