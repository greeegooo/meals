import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SignUpDto } from "./dtos/sign.up.dto";
import { User } from "./entities/user.entity";
import { UserDto } from "./dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInDto } from "./dtos/sign.in.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<UserDto> {
        this.logger.log('SignUp. Start.');
        console.log(signUpDto);
        let user = new User();
        user.name = signUpDto.user;
        user.pass = signUpDto.pass;
        user.role = signUpDto.role;

        this.logger.log('SignUp. Befor save');
        let ety = this.usersRepository.create(user);
        ety = await this.usersRepository.save(ety);
        this.logger.log('SignUp. Save success.');

        return this.mapToDto(ety);
    }

    async signIn(signInDto: SignInDto): Promise<UserDto> {
        this.logger.log('SignIn. Start.');
        let ety = await this.getBy(signInDto.user);

        this.logger.log('SignIn. Validating credentials.');
        if(ety.pass !== signInDto.pass) 
            throw new BadRequestException('User or Pass has inconvenient.');
        let dto = this.mapToDto(ety);

        this.logger.log('SignIn. Generating token.');
        dto.token = 'TOKEN';
        
        return dto;
    }

    private async getBy(name: string): Promise<User> {
        let entity = await this.usersRepository.findOne({where: { name }});
        if (!entity) throw new NotFoundException('User not found.');
        
        return entity;
    }

    private mapToDto(entity: User): UserDto {
        let dto = new UserDto();
        dto.name = entity.name;
        dto.role = entity.role;
        return dto;
    }
}