import { Component, OnInit } from '@angular/core';
import { accountAddedSubscriptionGQL, getAllAccountsGQL } from '../../api/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '@form-test/api-interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'form-test-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<Account> = new MatTableDataSource();

  displayedColumns = [
    'sourceAccountId',
    'accountName',
    'accountType',
    'accountCreatedDate',
    'privateMarket',
    'privateMarketSubtype'
  ];

  constructor(
    private getAllAccounts: getAllAccountsGQL,
    private accountSub: accountAddedSubscriptionGQL,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllAccounts
      .fetch()
      .pipe(take(1))
      .subscribe(({ data: { accounts } }) => {
        this.dataSource.data = accounts;
      });

    this.accountSub.subscribe().subscribe(({ data: { accountAdded } }) => {
      this.snackBar.open('New Account Recieved From Server');
      this.dataSource.data = [...this.dataSource.data, <any>accountAdded];
    });
  }
}
