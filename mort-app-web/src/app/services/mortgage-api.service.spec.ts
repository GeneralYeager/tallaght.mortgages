import { TestBed } from '@angular/core/testing';

import { MortgageApiService } from './mortgage-api.service';

describe('MortgageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MortgageApiService = TestBed.get(MortgageApiService);
    expect(service).toBeTruthy();
  });
});
