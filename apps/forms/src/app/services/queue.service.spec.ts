import { TestBed } from '@angular/core/testing';

import { QueueService } from './queue.service';

const createSecurity = () => ({
  id: 'id',
  type: 'TYPE',
  param1: 'TEST',
  param2: 'TEST',
  param3: 'TEST',
  param4: 'TEST',
  param5: 'TEST',
  param6: 'TEST',
  param7: 'TEST',
  param8: 'TEST',
  param9: 'TEST',
  param10: 'TEST',
  param11: 'TEST',
  param12: 'TEST'
});

const LIST = Array(5000).fill(createSecurity());

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueService);

    service.data = LIST;
  });

  it('should have data', () => {
    expect(service.data).toBeDefined();
  });

  it('should be able to start a queue', () => {
    service.startBatch().subscribe(res => {
      console.log(res);
    });
  });
});
