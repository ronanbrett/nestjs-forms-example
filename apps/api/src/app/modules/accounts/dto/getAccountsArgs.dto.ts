import { ArgsType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { AccountType } from '@form-test/api-interfaces';

@ArgsType()
export class GetAccountsArgsDTO {
  @Field({ nullable: true })
  accountId: string;

  @Field({ nullable: true })
  accountName: string;

  @Field({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(type => AccountType, { nullable: true })
  accountType?: AccountType;
}
