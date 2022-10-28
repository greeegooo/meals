import { RatingDto } from "../dtos/rating.dto";

export class RatingsFactory {
    static getDtoInstance(
        meal: string,
        user: string,
        value: number
    ) {
        let dto = new RatingDto();
        dto.meal = meal;
        dto.user = user;
        dto.value = value;
        return dto;
    }
}