import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/db/db.module';
import { FormFieldsResolver } from './form-fields.resolver';
import { FormFieldsService } from './form-fields.service';

@Module({
  imports: [DatabaseModule],
  providers: [FormFieldsResolver, FormFieldsService]
})
export class FormFieldsModule {}
