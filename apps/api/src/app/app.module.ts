import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AccountsModule } from './modules/accounts/accounts.module';
import { FormFieldsModule } from './modules/form-fields/form-fields.module';
import { environment } from '../environments/environment';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TestModule,
    AccountsModule,
    FormFieldsModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(
        process.cwd(),
        'libs/api-interfaces/src/gql/schema.gql'
      )
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
