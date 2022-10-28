import { UserRoleEnum } from "../entities/user.entity";

export class SignUpDto {
    user: string;
    pass: string;
    role: UserRoleEnum;
}