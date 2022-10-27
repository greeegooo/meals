export class Rating {
    constructor(
        _mealId: number,
        _userId: number,
        _value: number
    ) {
        this.mealId = _mealId;
        this.userId = _userId;
        this.value = _value;
    }
    id: number;
    mealId: number;
    userId: number;
    value: number;
}