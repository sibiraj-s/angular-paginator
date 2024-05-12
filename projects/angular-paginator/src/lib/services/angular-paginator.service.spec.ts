import { TestBed } from '@angular/core/testing';

import { AngularPaginatorService } from './angular-paginator.service';

describe('AngularPaginatorService', () => {
  let service: AngularPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
