import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import {
  createNewAccountGQL,
  getAllAccountsGQL,
  getAllFieldsGQL
} from './api/api';

@Component({
  selector: 'form-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private getAllFieldsQuery: getAllFieldsGQL,
    private createNewAccount: createNewAccountGQL,
    private snackBar: MatSnackBar
  ) {
    this.getAllFieldsQuery
      .watch()
      .valueChanges.subscribe(({ data: { fields } }) => {
        this.fields = fields;
      });
  }

  ngOnInit() {}

  onSubmit() {
    this.createNewAccount
      .mutate({
        accountInput: this.form.value
      })
      .pipe(
        take(1),
        switchMap(x => {
          if (x?.errors?.length) {
            return throwError(x.errors[0]);
          }

          return EMPTY;
        }),
        catchError(err => {
          const { message } = err.message;
          this.snackBar.open(`${message}`);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
