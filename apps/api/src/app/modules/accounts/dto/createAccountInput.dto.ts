import { InputType, Field } from '@nestjs/graphql';
import {
  AccountType,
  PrivateMarketSubtype,
  Account
} from '@form-test/api-interfaces';

@InputType()
export class CreateAccountInputDTO implements Account {
  @Field({ nullable: true })
  accountName: string;

  @Field({ nullable: true })
  sourceAccountId: string;

  @Field(type => AccountType)
  accountType: AccountType;

  @Field(type => Date)
  accountCreatedDate: Date;

  @Field({ nullable: true })
  privateMarket: boolean;

  @Field(type => PrivateMarketSubtype, { nullable: true })
  privateMarketSubType: PrivateMarketSubtype;
}
