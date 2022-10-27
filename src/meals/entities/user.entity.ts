export class User {
    constructor(
        _id: string,
        _name: string,
        _role: UserRoleEnum
    ) {
        this.id = _id;
        this.name = _name;
        this.role = _role;
    }
    id: string;
    name: string;
    role: UserRoleEnum;
}

export enum UserRoleEnum {
    CUSTOMER,
    CHEF
}