import { RatingDto } from "../dtos/rating.dto";
import { Rating } from "../entities/rating.entity";

export class RatingsFactory {
    static getDtoInstance(
        entity: Rating
    ) {
        let dto = new RatingDto();
        dto.meal = entity.meal.name;
        dto.user = entity.user.name;
        dto.value = entity.value;
        return dto;
    }
}