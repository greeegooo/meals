import { Body, Controller, Post } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/sign.in.dto";
import { SignUpDto } from "./dtos/sign.up.dto";
import { UserDto } from "./dtos/user.dto";
import { User, UserRoleEnum } from "./entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return await this.authService.signUp(signUpDto);
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<UserDto> {
        return await this.authService.signIn(signInDto);
    }
}