import { Module } from '@nestjs/common';
import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { PostsResolver } from './posts.resolvers';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  emoji?: string;

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  thumbNailUrl: string;

  @Field(() => String, { nullable: true })
  excerpt?: string;

  @Field(() => String)
  contentPath: string;

  @Field(() => Boolean, { nullable: true })
  published: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishDate?: Date;
}

@Module({ providers: [PostsResolver] })
export class PostsModule {}
