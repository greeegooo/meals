export class Meal {
    constructor(
        _id: number,
        _chefName: string,
        _name: string,
        _rate: number)
    {
        this.id = _id;
        this.chefName = _chefName;
        this.name = _name;
        this.rate = _rate;
    }

    id: number;
    chefName: string;
    name: string;
    rate: number;
}