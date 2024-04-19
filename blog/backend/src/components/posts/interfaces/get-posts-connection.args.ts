import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPostsArgs {
  @Field(() => [String], { nullable: true })
  type?: string[];
}
