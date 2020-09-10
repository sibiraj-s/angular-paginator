import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularPaginatorDirective } from './angular-paginator.directive';
import { AngularPaginatorService } from '../services/angular-paginator.service';

describe('AngularPaginatorDirective', () => {
  let service: AngularPaginatorService;
  let directive: AngularPaginatorDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AngularPaginatorService],
      declarations: [AngularPaginatorDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = new AngularPaginatorService();
    directive = new AngularPaginatorDirective(service);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return a page object', () => {
    const pageObject = directive.makePage(1, 1, true);
    expect(pageObject).toEqual({ number: 1, text: 1, active: true });
  });

  it('should return an array of page objects', () => {
    const pages = directive.getPages(1, 10, 100);
    expect(pages instanceof Array).toBe(true);
  });

  it('should return an array with first page object to be Active', () => {
    const pages = directive.getPages(1, 10, 100);
    expect(pages[0].active).toBe(true);
  });
});
