export class Meal {
    constructor(
        _id: number,
        _chef_name: string,
        _name: string,
        _rate: number)
    {
        this.id = _id;
        this.chef_name = _chef_name;
        this.name = _name;
        this.rate = _rate;
    }
    
    id: number;
    chef_name: string;
    name: string;
    rate: number;
}