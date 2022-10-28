import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty({
        description: 'The user name'
    })
    user: string;

    @ApiProperty({
        description: 'The password'
    })
    pass: string;
}