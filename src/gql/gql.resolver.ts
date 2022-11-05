import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GqlResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }
}
