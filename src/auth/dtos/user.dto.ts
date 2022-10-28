import { ApiProperty } from "@nestjs/swagger";
import { UserRoleEnum } from "../entities/role.enum";

export class UserDto {
    @ApiProperty({
        description: 'The user name'
    })
    name: string;

    @ApiProperty({
        description: 'The user role'
    })
    role: UserRoleEnum;

    @ApiProperty({
        description: 'The token to use mealsApi'
    })
    token: string;
}