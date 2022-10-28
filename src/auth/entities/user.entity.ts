export class User {
    constructor(
        _id: string,
        _name: string,
        _pass: string,
        _role: UserRoleEnum
    ) {
        this.id = _id;
        this.name = _name;
        this.pass = _pass;
        this.role = _role;
    }
    id: string;
    name: string;
    pass: string;
    role: UserRoleEnum;
}

export enum UserRoleEnum {
    CUSTOMER,
    CHEF
}