import { AccountType } from '@form-test/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetAccountsArgsDTO } from './dto/getAccountsArgs.dto';
import { CreateAccountInputDTO } from './dto/createAccountInput.dto';
import { Account, AccountModel } from './models/account.model';
import { reduce } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account') private accountModel: Model<AccountModel>
  ) {}

  async create(accountInput: CreateAccountInputDTO): Promise<Account> {
    const newAccount = await this.accountModel.create(accountInput);
    return newAccount as Account;
  }

  async findAll(accountArgs: Partial<GetAccountsArgsDTO>): Promise<Account[]> {
    const query = reduce(
      accountArgs,
      (accum, val, key) => {
        accum[key] = val;
        return accum;
      },
      {}
    );

    const accounts = await this.accountModel.find(query).exec();
    return accounts as Account[];
  }

  async findByOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id);
    return account as Account;
  }
}
