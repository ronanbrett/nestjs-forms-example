import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, empty, from, of, Subject } from 'rxjs';
import {
  bufferCount,
  bufferTime,
  catchError,
  concatMap,
  flatMap,
  map,
  mergeAll,
  mergeMap,
  retryWhen,
  scan,
  delay,
  switchMap,
  take,
  tap,
  windowCount
} from 'rxjs/operators';

import { reduce } from 'lodash';

import { random } from 'faker';
import { HttpClient } from '@angular/common/http';
import { accountAddedSubscriptionGQL } from '../api/api';

let count = 0;

const createSecurity = i => ({
  id: count++,
  type: 'TYPE'
});

const LIST = [...Array(100).keys()].map(x => createSecurity(x));

const options = {
  batchSize: 5,
  maxQueueSize: 15,
  retrieveCompaniesConcurrency: 1,
  retrieveOrdersConcurrency: 5,
  bulkEmailConcurrency: 5,
  maxBulkEmailCount: 5
};

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  data: any[] = LIST;
  CUR_OFFSET = 10;

  validationQueue = new BehaviorSubject(this.CUR_OFFSET);
  uploadQueue: Subject<any> = new Subject();
  errorQueue: Subject<any> = new Subject();
  constructor(private httpClient: HttpClient) {}

  validateSecurity(records: any) {
    return this.httpClient.post('/api/test/verify', { securities: records });
  }

  uploadSecurity(records: any) {
    return this.httpClient.post('/api/test/upload', { securities: records });
  }

  getDataSpliced(offset: number) {
    const d = this.data.splice(0, offset);
    // console.log(`Retrieving next ${offset} records. ${this.data.length} Left`);
    return d;
  }

  async startBatch() {
    this.validationQueue.next(this.CUR_OFFSET);

    this.validationQueue
      .pipe(
        mergeMap(x => {
          return of(this.getDataSpliced(x));
        }),

        tap(x => console.log(x)),

        map(records => {
          console.log(records);
          if (records.length === 0) {
            this.validationQueue.complete();
            return [];
          }

          this.validationQueue.next(this.CUR_OFFSET);

          return records;
        }),

        mergeMap(
          records =>
            this.validateSecurity(records).pipe(
              retryWhen(errors => errors.pipe(delay(1000), take(10))),
              catchError((err, caught) => {
                console.log(err, caught);
                records.map(x => (x.valid = false));
                return of(records);
              })
            ),
          5
        ),

        // scan(
        //   (acc, val) => {
        //     acc.totalProcessed += val.length;
        //     acc.records = val;

        //     let queueSize = acc.totalProcessed - acc.offset;

        //     console.log(queueSize, acc.totalProcessed, acc.offset);

        //     while (queueSize <= options.maxQueueSize) {
        //       acc.offset += this.CUR_OFFSET;
        //       this.validationQueue.next(this.CUR_OFFSET);
        //     }

        //     return acc;
        //   },
        //   {
        //     offset: 0,
        //     totalProcessed: 0,
        //     records: []
        //   }
        // ),

        scan(
          (acc, val: any[], index: number) => {
            const res = reduce(
              val,
              (acc, val) => {
                val.valid ? acc.success.push(val) : acc.rejected.push(val);
                acc.success;
                return acc;
              },
              { success: [], rejected: [] }
            );

            acc.total += val.length;
            acc.validated = res.success;
            acc.rejected = res.rejected;

            acc.processed = [...acc.processed, ...val.map(x => x.id)];

            // console.log('scanned', acc);
            return acc;
          },
          {
            total: 0,
            validated: [],
            rejected: [],
            processed: []
          }
        )
      )
      .subscribe(results => {
        this.uploadQueue.next(results.validated);
        this.errorQueue.next(results.rejected);
      });

    const upQueue = this.uploadQueue.pipe(
      mergeMap(records => this.uploadSecurity(records), 5),
      scan(
        (accum, val: any) => {
          if (!val) {
            return accum;
          }
          accum.totalUploaded += val.length;
          accum.success = [...accum.success, ...val];

          return accum;
        },
        { totalUploaded: 0, success: [] }
      )
    );

    const erQueue = this.errorQueue.pipe(
      scan(
        (accum, val) => {
          if (!val) {
            return accum;
          }
          accum.totalErrorCount += val.length;
          accum.rejected = [...accum.rejected, ...val];

          return accum;
        },
        { totalErrorCount: 0, rejected: [] }
      )
    );

    combineLatest([upQueue, erQueue]).subscribe(([upload, error]) => {
      console.log(upload, error);
    });
  }
}
