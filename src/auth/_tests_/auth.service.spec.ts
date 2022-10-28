import { Repository } from "typeorm";
import { AuthService } from "../auth.service";
import { SignUpDto } from "../dtos/sign.up.dto";
import { UserRoleEnum } from "../entities/role.enum";
import { User } from "../entities/user.entity";

describe('authService', () => {
    let subject: AuthService;
    let usersRepository: Repository<User>;

    beforeEach(() => {
        usersRepository = {
            create: () => {},
            save: (options) => {},
            findOne: (options) => {}
        } as Repository<User>;

        subject = new AuthService(usersRepository);
    });

    describe('signUp', () => {
        it('should add a new user', async () => {
            let entity = new User();
            entity.name = "name";
            entity.pass = "pass";
            entity.role = UserRoleEnum.CUSTOMER;
            jest.spyOn(usersRepository, 'create').mockImplementation();
            jest.spyOn(usersRepository, 'save').mockImplementation(async () => entity);

            let request = new SignUpDto();
            request.user = "name";
            request.pass = "pass";
            request.role = UserRoleEnum.CUSTOMER;

            expect(await subject.signUp(request))
                .toStrictEqual(subject.mapToDto(entity));
        });
    });

    describe('signIn', () => {
        it('should return user with a token', async () => {
            let entity = new User();
            entity.name = "name";
            entity.pass = "pass";
            entity.role = UserRoleEnum.CUSTOMER;
            jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => entity);

            let request = new SignUpDto();
            request.user = "name";
            request.pass = "pass";
            request.role = UserRoleEnum.CUSTOMER;

            let result = subject.mapToDto(entity);
            result.token = "TOKEN";

            expect(await subject.signIn(request)).toStrictEqual(result);
        });
    });
});