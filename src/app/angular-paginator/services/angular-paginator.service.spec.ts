import { TestBed, inject } from '@angular/core/testing';

import { AngularPaginatorService } from './angular-paginator.service';

describe('AngularPaginatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularPaginatorService]
    });
  });

  it('should be created', inject([AngularPaginatorService], (service: AngularPaginatorService) => {
    expect(service).toBeTruthy();
  }));
});
