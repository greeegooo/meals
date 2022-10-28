import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    pass: string;

    @Column()
    role: UserRoleEnum;
}

export enum UserRoleEnum {
    CUSTOMER,
    CHEF
}