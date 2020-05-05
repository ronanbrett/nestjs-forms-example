import { Test, TestingModule } from '@nestjs/testing';

import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { mocked } from 'ts-jest/utils';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

const TEST_ACCOUNT = {
  accountName: 'Test Acount',
  accountType: 'FUND',
  id: '243433',
  sourceAccountId: '123'
};

describe('AccountsResolver', () => {
  let moduleRef: TestingModule;

  let accountsResolver: AccountsResolver;
  let accountsService: AccountsService;
  let accountsModel: any;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        AccountsResolver,
        AccountsService,
        {
          provide: getModelToken('Account'),
          useValue: {
            create: jest.fn(() => Promise.resolve(TEST_ACCOUNT)),
            findById: jest.fn(() => Promise.resolve(TEST_ACCOUNT)),
            findAll: jest.fn(() => Promise.resolve([TEST_ACCOUNT])),
            find: jest.fn(() => ({
              exec: () => Promise.resolve([TEST_ACCOUNT])
            }))
          }
        }
      ]
    }).compile();

    accountsResolver = moduleRef.get<AccountsResolver>(AccountsResolver);
    accountsService = moduleRef.get<AccountsService>(AccountsService);
    accountsModel = moduleRef.get<any>('AccountModel');
  });

  describe('AccountsResolver', () => {
    it('should be able to create an account by id', async () => {
      spyOn(accountsService, 'findAll').and.returnValue(Promise.resolve([]));
      const acc = await accountsResolver.createAccount(<any>TEST_ACCOUNT);

      expect(acc).toEqual(TEST_ACCOUNT);
    });

    it('should throw a ConflictException if it founds a prexisting account ', async () => {
      spyOn(accountsService, 'findAll').and.returnValue(Promise.resolve([{}]));
      const acc = await accountsResolver.createAccount(<any>TEST_ACCOUNT);

      expect(accountsService.findAll).toHaveBeenCalledWith({
        accountName: TEST_ACCOUNT.accountName
      });

      expect(acc.response).toMatchObject({
        statusCode: 409,
        error: 'Conflict',
        message:
          'An Account with this Name or Source Account ID already exists.'
      });
    });

    it('should be able to retrive an account by id', async () => {
      const acc = await accountsResolver.account('243433');
      expect(acc).toEqual(TEST_ACCOUNT);
    });

    it('should be able to retrive a list of all accounts', async () => {
      const acc = await accountsResolver.accounts();
      expect(acc.length).toEqual(1);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
