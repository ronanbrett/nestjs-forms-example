import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
};



export type Account = {
   __typename?: 'Account';
  id: Scalars['ID'];
  accountName: Scalars['String'];
  sourceAccountId: Scalars['String'];
  accountType: AccountType;
  accountCreatedDate: Scalars['DateTime'];
  privateMarket?: Maybe<Scalars['Boolean']>;
  privateMarketSubType?: Maybe<PrivateMarketSubtype>;
};

export enum AccountType {
  ACCOUNT = 'ACCOUNT',
  GROUP_ACCOUNT = 'GROUP_ACCOUNT',
  FUND = 'FUND',
  ENTITY = 'ENTITY'
}


export enum PrivateMarketSubtype {
  LSA = 'LSA',
  LTD = 'LTD'
}

export type TemplateOptions = {
   __typename?: 'TemplateOptions';
  label?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Scalars['JSON']>>;
};


export type FormField = {
   __typename?: 'FormField';
  key: Scalars['ID'];
  type: FIELD_TYPES;
  templateOptions: TemplateOptions;
  expressionProperties?: Maybe<Scalars['JSON']>;
  hideExpression?: Maybe<Scalars['String']>;
  fieldSet?: Maybe<FormField>;
};

export enum FIELD_TYPES {
  input = 'input',
  datepicker = 'datepicker',
  autocomplete = 'autocomplete',
  select = 'select',
  toggle = 'toggle',
  radio = 'radio'
}

export type Query = {
   __typename?: 'Query';
  account: Account;
  accounts: Array<Account>;
  fields: Array<FormField>;
};


export type QueryaccountArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryaccountsArgs = {
  accountId?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  accountType?: Maybe<AccountType>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createAccount: Account;
};


export type MutationcreateAccountArgs = {
  accountInput: CreateAccountInputDTO;
};

export type CreateAccountInputDTO = {
  accountName?: Maybe<Scalars['String']>;
  sourceAccountId?: Maybe<Scalars['String']>;
  accountType: AccountType;
  accountCreatedDate: Scalars['DateTime'];
  privateMarket?: Maybe<Scalars['Boolean']>;
  privateMarketSubType?: Maybe<PrivateMarketSubtype>;
};

export type Subscription = {
   __typename?: 'Subscription';
  accountAdded: Account;
};

export type getAllAccountsQueryVariables = {};


export type getAllAccountsQuery = (
  { __typename?: 'Query' }
  & { accounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName' | 'accountType' | 'accountCreatedDate' | 'sourceAccountId' | 'privateMarket' | 'privateMarketSubType'>
  )> }
);

export type createNewAccountMutationVariables = {
  accountInput: CreateAccountInputDTO;
};


export type createNewAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName' | 'accountType' | 'accountCreatedDate' | 'sourceAccountId' | 'privateMarket' | 'privateMarketSubType'>
  ) }
);

export type accountAddedSubscriptionSubscriptionVariables = {};


export type accountAddedSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { accountAdded: (
    { __typename?: 'Account' }
    & Pick<Account, 'accountName' | 'accountType' | 'accountCreatedDate' | 'privateMarket' | 'sourceAccountId' | 'privateMarketSubType'>
  ) }
);

export type getAllFieldsQueryVariables = {};


export type getAllFieldsQuery = (
  { __typename?: 'Query' }
  & { fields: Array<(
    { __typename?: 'FormField' }
    & Pick<FormField, 'key' | 'type' | 'hideExpression'>
    & { templateOptions: (
      { __typename?: 'TemplateOptions' }
      & Pick<TemplateOptions, 'label' | 'placeholder' | 'description' | 'options' | 'required'>
    ), fieldSet?: Maybe<(
      { __typename?: 'FormField' }
      & Pick<FormField, 'key'>
      & { templateOptions: (
        { __typename?: 'TemplateOptions' }
        & Pick<TemplateOptions, 'label'>
      ) }
    )> }
  )> }
);

export const getAllAccountsDocument = gql`
    query getAllAccounts {
  accounts {
    id
    accountName
    accountType
    accountCreatedDate
    sourceAccountId
    privateMarket
    privateMarketSubType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class getAllAccountsGQL extends Apollo.Query<getAllAccountsQuery, getAllAccountsQueryVariables> {
    document = getAllAccountsDocument;
    
  }
export const createNewAccountDocument = gql`
    mutation createNewAccount($accountInput: CreateAccountInputDTO!) {
  createAccount(accountInput: $accountInput) {
    id
    accountName
    accountType
    accountCreatedDate
    sourceAccountId
    privateMarket
    privateMarketSubType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class createNewAccountGQL extends Apollo.Mutation<createNewAccountMutation, createNewAccountMutationVariables> {
    document = createNewAccountDocument;
    
  }
export const accountAddedSubscriptionDocument = gql`
    subscription accountAddedSubscription {
  accountAdded {
    accountName
    accountType
    accountCreatedDate
    privateMarket
    sourceAccountId
    privateMarketSubType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class accountAddedSubscriptionGQL extends Apollo.Subscription<accountAddedSubscriptionSubscription, accountAddedSubscriptionSubscriptionVariables> {
    document = accountAddedSubscriptionDocument;
    
  }
export const getAllFieldsDocument = gql`
    query getAllFields {
  fields {
    key
    type
    hideExpression
    templateOptions {
      label
      placeholder
      description
      options
      required
    }
    fieldSet {
      key
      templateOptions {
        label
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class getAllFieldsGQL extends Apollo.Query<getAllFieldsQuery, getAllFieldsQueryVariables> {
    document = getAllFieldsDocument;
    
  }