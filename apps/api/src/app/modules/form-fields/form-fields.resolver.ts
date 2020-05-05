import { FormFieldsService } from './form-fields.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FormField } from './models/form-field.model';

@Resolver(of => FormField)
export class FormFieldsResolver {
  constructor(private readonly formFieldService: FormFieldsService) {}

  @Query(returns => [FormField])
  async fields(): Promise<FormField[]> {
    const fields = await this.formFieldService.getFormFields();
    return fields;
  }
}
