import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FIELD_TYPES } from '@form-test/api-interfaces';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { TemplateOptions } from './form-template-options.model';
import graphqlTypeJson from 'graphql-type-json';

registerEnumType(FIELD_TYPES, {
  name: 'FIELD_TYPES'
});

@ObjectType()
export class FormField implements FormlyFieldConfig {
  @Field(type => ID)
  key: string;

  @Field(type => FIELD_TYPES)
  type: FIELD_TYPES;

  @Field(type => TemplateOptions)
  templateOptions: TemplateOptions;

  @Field(type => graphqlTypeJson, { nullable: true })
  expressionProperties?: any;

  @Field({ nullable: true })
  hideExpression?: string;

  @Field(type => FormField, { nullable: true })
  fieldSet?: FormField;
}
