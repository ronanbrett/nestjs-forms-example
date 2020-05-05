export enum PrivateMarketSubtype {
  LSA = 'LSA',
  LTD = 'LTD'
}

export enum AccountType {
  ACCOUNT = 'ACCOUNT',
  GROUP_ACCOUNT = 'GROUP_ACCOUNT',
  FUND = 'FUND',
  ENTITY = 'ENTITY'
}

export interface Account {
  sourceAccountId: string;
  accountName: string;
  accountType: AccountType;
  accountCreatedDate?: Date;
  privateMarket?: boolean;
  privateMarketSubtype?: boolean;
}
