import { Injectable } from "@nestjs/common";
import { usersRepo } from "src/test.repositories";
import { SignUpDto } from "./dtos/sign.up.dto";
import { User, UserRoleEnum } from "./entities/user.entity";
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class AuthService {
    constructor() {
        usersRepo.push(new User(uuidv4(), 'GregCustomer', '1', UserRoleEnum.CUSTOMER));
        usersRepo.push(new User(uuidv4(), 'GregChef', '1', UserRoleEnum.CHEF));
        usersRepo.push(new User(uuidv4(), 'John', '1', UserRoleEnum.CHEF));
        usersRepo.push(new User(uuidv4(), 'Tom', '1', UserRoleEnum.CHEF));

        console.log(usersRepo);
    }

    signUp(signUpDto: SignUpDto): UserDto {
        let user = new User(
            uuidv4(),
            signUpDto.user,
            signUpDto.pass,
            signUpDto.role
        );

        usersRepo.push(user);
        console.log(usersRepo);
        return this.getBy(user.id);
    }

    private getBy(id: string): UserDto {
        let ety = usersRepo.find(user => user.id === id);
        if (!ety) throw new Error('User not found.');
        let dto = new UserDto();
        dto.name = ety.name;
        dto.role = ety.role;

        return dto;
    }
}