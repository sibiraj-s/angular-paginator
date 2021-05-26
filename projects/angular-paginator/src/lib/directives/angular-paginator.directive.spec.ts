import { TestBed } from '@angular/core/testing';
import { AngularPaginatorDirective } from './angular-paginator.directive';
import { AngularPaginatorService } from '../services/angular-paginator.service';

describe('AngularPaginatorDirective', () => {
  let service: AngularPaginatorService;
  let directive: AngularPaginatorDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AngularPaginatorService],
      declarations: [AngularPaginatorDirective],
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = new AngularPaginatorService();
    directive = new AngularPaginatorDirective(service);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
