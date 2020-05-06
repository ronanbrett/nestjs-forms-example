import { Module } from '@nestjs/common';
import { FormFieldsResolver } from './form-fields.resolver';
import { FormFieldsService } from './form-fields.service';

@Module({
  imports: [],
  providers: [FormFieldsResolver, FormFieldsService]
})
export class FormFieldsModule {}
