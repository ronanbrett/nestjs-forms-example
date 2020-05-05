import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Account } from './models/account.model';
import { GetAccountsArgsDTO } from './dto/getAccountsArgs.dto';
import { AccountsService } from './accounts.service';
import {
  NotFoundException,
  ConflictException,
  UseInterceptors
} from '@nestjs/common';
import { CreateAccountInputDTO } from './dto/createAccountInput.dto';
import { PubSub } from 'graphql-subscriptions';
import { DataInterceptor } from '../../core/interceptors/data.interceptor';

const pubSub = new PubSub();

@UseInterceptors(DataInterceptor)
@Resolver(of => Account)
export class AccountsResolver {
  constructor(private readonly accountService: AccountsService) {}

  /**
   * Get Account
   * @param id AccountID
   */
  @Query(returns => Account)
  async account(@Args('id', { nullable: true }) id?: string): Promise<Account> {
    const account = await this.accountService.findByOne(id);
    if (!account) {
      throw new NotFoundException(id);
    }
    return account;
  }

  /**
   * Get All Accounts
   * @param accountArgs
   */
  @Query(returns => [Account])
  async accounts(@Args() accountArgs?: GetAccountsArgsDTO): Promise<Account[]> {
    return this.accountService.findAll(accountArgs);
  }

  @Subscription(returns => Account)
  accountAdded() {
    return pubSub.asyncIterator('accountAdded');
  }

  /**
   * Create an Account
   * @param accountInput
   */
  @Mutation(returns => Account)
  async createAccount(
    @Args('accountInput') accountInput: CreateAccountInputDTO
  ) {
    try {
      const doesAccountExist = await this.accountService.findAll({
        accountName: accountInput.accountName
      });

      if (doesAccountExist.length > 0) {
        throw new ConflictException(
          'An Account with this Name or Source Account ID already exists.'
        );
      }

      const data = await this.accountService.create(accountInput);

      pubSub.publish('accountAdded', { accountAdded: data });

      return data;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Validation Failure', err.keyValue);
      }

      return err;
    }
  }
}
