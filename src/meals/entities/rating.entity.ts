import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Meal } from "./meal.entity";

@Entity({ name: 'ratings' })
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Meal)
    meal: Meal;

    @ManyToOne(() => User)
    user: User;

    @Column()
    value: number;
}