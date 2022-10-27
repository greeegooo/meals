export class User {
    constructor(
        _id: number,
        _name: string,
        _role: UserRoleEnum
    ) {
        this.id = _id;
        this.name = _name;
        this.role = _role;
    }
    id: number;
    name: string;
    role: UserRoleEnum;
}

export enum UserRoleEnum {
    CUSTOMER,
    CHEF
}