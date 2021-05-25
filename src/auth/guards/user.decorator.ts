import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.pg.entity";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        deleteUserFields(request.user);
        return request.user;
    }
)

const deleteUserFields = (user: UserEntity) => {
    delete user.tasks;
    delete user.password;
    delete user.salt;
}