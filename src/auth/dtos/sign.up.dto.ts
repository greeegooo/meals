import { ApiProperty } from "@nestjs/swagger";
import { UserRoleEnum } from "../entities/role.enum";

export class SignUpDto {
    @ApiProperty({
        description: 'The user name'
    })
    user: string;

    @ApiProperty({
        description: 'The user name'
    })
    pass: string;

    @ApiProperty({
        description: 'The role of the user',
        enum: ['CHEF', 'CUSTOMER']
    })
    role: UserRoleEnum;
}