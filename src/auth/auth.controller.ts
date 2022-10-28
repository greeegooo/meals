import { Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('sign-up')
    signUp() {
        return 'sign-up';
    }

    @Post('sign-in')
    signIn() {
        return 'sign-in';
    }
}