import { UserRoleEnum } from "../entities/user.entity";

export class UserDto {
    name: string;
    role: UserRoleEnum;
}