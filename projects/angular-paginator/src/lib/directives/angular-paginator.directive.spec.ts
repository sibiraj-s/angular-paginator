import { TestBed } from '@angular/core/testing';
import { runInInjectionContext, Injector } from '@angular/core';
import { AngularPaginatorDirective } from './angular-paginator.directive';
import { AngularPaginatorService } from '../services/angular-paginator.service';

describe('AngularPaginatorDirective', () => {
  let directive: AngularPaginatorDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AngularPaginatorDirective],
      providers: [AngularPaginatorService]
    })

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    directive = runInInjectionContext(TestBed.inject(Injector), () => new AngularPaginatorDirective());
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
