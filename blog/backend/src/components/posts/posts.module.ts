import { Module } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostsResolver } from './posts.resolvers';

@ObjectType()
export class PostModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

@Module({ providers: [PostsResolver] })
export class PostsModule {}
