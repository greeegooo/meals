import { Injectable } from "@nestjs/common";
import { SignUpDto } from "./dtos/sign.up.dto";
import { User } from "./entities/user.entity";
import { UserDto } from "./dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInDto } from "./dtos/sign.in.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<UserDto> {
        console.log(signUpDto);
        let user = new User();
        user.name = signUpDto.user;
        user.pass = signUpDto.pass;
        user.role = signUpDto.role;

        let ety = this.usersRepository.create(user);
        ety = await this.usersRepository.save(ety);
        return this.mapToDto(ety);
    }

    async signIn(signInDto: SignInDto): Promise<UserDto> {
        let ety = await this.getBy(signInDto.user);
        if(ety.pass !== signInDto.pass) 
            throw new Error('User or Pass has inconvenient.');
        let dto = this.mapToDto(ety);
        dto.token = 'TOKEN';
        return dto;
    }

    private async getBy(name: string): Promise<User> {
        let entity = await this.usersRepository.findOne({where: { name }});
        if (!entity) throw new Error('User not found.');
        
        return entity;
    }

    private mapToDto(entity: User): UserDto {
        let dto = new UserDto();
        dto.name = entity.name;
        dto.role = entity.role;
        return dto;
    }
}