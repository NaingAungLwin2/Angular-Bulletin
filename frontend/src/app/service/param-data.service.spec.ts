import { TestBed } from '@angular/core/testing';

import { ParamDataService } from './param-data.service';

describe('ParamDataService', () => {
  let service: ParamDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
