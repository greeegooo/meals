import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'meals' })
export class Meal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn()
    chef: User;

    @Column()
    name: string;

    @Column()
    rating: number;
}