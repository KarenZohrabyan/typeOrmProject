import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/utility/enums/role.enum";

export class UpdateUser {
    @ApiProperty()
    public name: string;
    
    @ApiProperty()
    public role: Role
}