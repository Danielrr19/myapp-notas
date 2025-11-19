import { TestBed } from '@angular/core/testing';

import { TaksAPIService } from './taks-api.service';

describe('TaksAPIService', () => {
  let service: TaksAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaksAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
