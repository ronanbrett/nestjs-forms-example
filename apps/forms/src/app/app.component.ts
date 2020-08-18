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
import { QueueService } from './services/queue.service';

@Component({
  selector: 'form-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private queueService: QueueService) {}

  ngOnInit() {
    this.startBatching();
  }

  async startBatching() {
    await this.queueService.startBatch();
  }
}
