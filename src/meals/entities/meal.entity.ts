export class Meal {
    constructor(
        _id: string,
        _chefId: string,
        _name: string)
    {
        this.id = _id;
        this.chefId = _chefId;
        this.name = _name;
    }

    id: string;
    chefId: string;
    name: string;
}