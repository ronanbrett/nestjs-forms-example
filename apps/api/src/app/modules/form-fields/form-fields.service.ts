import { Injectable } from '@nestjs/common';
import { FIELD_TYPES } from '@form-test/api-interfaces';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormField } from './models/form-field.model';
import { AccountType, PrivateMarketSubtype } from '@form-test/api-interfaces';

@Injectable()
export class FormFieldsService {
  getFormFields(): Promise<FormField[]> {
    return Promise.resolve(<FormField[]>[
      {
        key: 'accountName',
        type: FIELD_TYPES.input,
        templateOptions: {
          label: 'Account Name',
          required: true,
          placeholder: 'Enter the Account Name',
          description: 'The name of an Account'
        }
      },
      {
        key: 'sourceAccountId',
        type: FIELD_TYPES.input,
        templateOptions: {
          required: true,
          label: 'Source Account ID',
          placeholder: 'Enter the Source Account ID Name',
          description: 'The identifier for the Account'
        }
      },
      {
        key: 'accountType',
        type: FIELD_TYPES.select,
        templateOptions: {
          label: 'Account Type',
          required: true,
          placeholder: 'Select an Account Type',
          description: 'The type of Account',
          options: [
            {
              label: 'Account',
              value: AccountType.ACCOUNT
            },
            {
              label: 'Group Account',
              value: AccountType.GROUP_ACCOUNT
            },
            {
              label: 'Fund',
              value: AccountType.FUND
            },
            {
              label: 'Entity',
              value: AccountType.ENTITY
            }
          ]
        }
      },
      {
        key: 'accountCreatedDate',
        type: FIELD_TYPES.datepicker,
        templateOptions: {
          required: true,
          label: 'Account Created Date',
          placeholder: 'Choose the date the account was created',
          description: 'The date the account was first created'
        }
      },
      {
        key: 'privateMarket',
        type: FIELD_TYPES.toggle,
        templateOptions: {
          label: 'Private Market',
          placeholder: 'Is this a Private Market Account'
        }
      },
      {
        key: 'privateMarketSubType',
        type: FIELD_TYPES.select,
        hideExpression: '!model.privateMarket',
        templateOptions: {
          label: 'Private Market',
          placeholder: 'Is this a Private Market Account',
          required: true,
          options: [
            {
              label: 'LSA',
              value: PrivateMarketSubtype.LSA
            },
            {
              label: 'LTD',
              value: PrivateMarketSubtype.LTD
            }
          ]
        }
      }
    ]);
  }
}
