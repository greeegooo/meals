import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEnum } from "./role.enum";

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