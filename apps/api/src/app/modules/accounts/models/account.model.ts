import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Account as AccountInterface,
  AccountType,
  PrivateMarketSubtype
} from '@form-test/api-interfaces';
import { Document } from 'mongoose';

registerEnumType(AccountType, {
  name: 'AccountType'
});

registerEnumType(PrivateMarketSubtype, {
  name: 'PrivateMarketSubtype'
});

export interface AccountModel extends AccountInterface, Document {}

@ObjectType()
export class Account implements AccountInterface {
  @Field(type => ID)
  id: string;

  @Field()
  accountName: string;

  @Field()
  sourceAccountId: string;

  @Field(type => AccountType)
  accountType: AccountType;

  @Field()
  accountCreatedDate?: Date;

  @Field({ nullable: true })
  privateMarket?: boolean;

  @Field(type => PrivateMarketSubtype, { nullable: true })
  privateMarketSubType?: PrivateMarketSubtype;
}
