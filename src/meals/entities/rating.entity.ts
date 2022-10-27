export class Rating {
    constructor(
        _mealId: string,
        _userId: string,
        _value: number
    ) {
        this.mealId = _mealId;
        this.userId = _userId;
        this.value = _value;
    }
    id: string;
    mealId: string;
    userId: string;
    value: number;
}