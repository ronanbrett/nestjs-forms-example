import { AccountType } from '@form-test/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Model, Connection, connection } from 'mongoose';
import { GetAccountsArgsDTO } from './dto/getAccountsArgs.dto';
import { CreateAccountInputDTO } from './dto/createAccountInput.dto';
import { Account, AccountModel } from './models/account.model';
import { reduce } from 'lodash';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account') private accountModel: Model<AccountModel>
  ) {}

  async create(accountInput: CreateAccountInputDTO): Promise<Account> {
    try {
      const session = await this.accountModel.db.startSession();

      try {
        await session.startTransaction();

        const newAccount = await this.accountModel.create(accountInput);

        await session.commitTransaction();
        return newAccount as Account;
      } catch (err) {
        await session.abortTransaction();
        console.log(err);
      } finally {
        await session.endSession();
      }
    } catch (error) {
      console.log(error);
      console.log("Transaction couldn't create");
    }
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
