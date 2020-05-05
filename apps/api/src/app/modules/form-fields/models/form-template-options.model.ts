import { Field, Int, ObjectType } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export class TemplateOptions {
  @Field({ nullable: true })
  label: string;

  @Field({ nullable: true })
  placeholder: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  required: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [graphqlTypeJson], { nullable: true })
  options?: any;
}
