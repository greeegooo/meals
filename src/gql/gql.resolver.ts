import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GqlResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float)
  getRandom(): number {
    return Math.random();
  }
}
