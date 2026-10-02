import { TestBed } from '@angular/core/testing';

import { AngularPaginatorService } from './angular-paginator.service';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

const instance = (overrides: Partial<AngularPaginatorInstance> = {}): AngularPaginatorInstance => ({
  id: 'test',
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 100,
  ...overrides,
});

describe('AngularPaginatorService', () => {
  let service: AngularPaginatorService;
  let emitted: string[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularPaginatorService);

    emitted = [];
    service.change.subscribe((id) => emitted.push(id));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('uses a default id', () => {
    expect(AngularPaginatorService.id).toBe('ANGULAR_PAGINATOR_DEFAULT');
  });

  it('registers a new instance and emits its id', () => {
    service.registerInstance(instance());

    expect(service.getInstance('test')).toEqual(instance());
    expect(emitted).toEqual(['test']);
  });

  it('does not emit when an identical instance is registered again', () => {
    service.registerInstance(instance());
    service.registerInstance(instance());

    expect(emitted).toEqual(['test']);
  });

  it.each([
    ['currentPage', { currentPage: 2 }],
    ['itemsPerPage', { itemsPerPage: 20 }],
    ['totalItems', { totalItems: 50 }],
  ])('updates the instance and emits when %s changes', (_, changes) => {
    service.registerInstance(instance());
    service.registerInstance(instance(changes));

    expect(service.getInstance('test')).toEqual(instance(changes));
    expect(emitted).toEqual(['test', 'test']);
  });

  it('keeps instances with different ids separate', () => {
    service.registerInstance(instance({ id: 'first', currentPage: 2 }));
    service.registerInstance(instance({ id: 'second', currentPage: 5 }));

    expect(service.getCurrentPage('first')).toBe(2);
    expect(service.getCurrentPage('second')).toBe(5);
    expect(emitted).toEqual(['first', 'second']);
  });

  it('returns undefined for an unknown id', () => {
    expect(service.getInstance('unknown')).toBeUndefined();
  });
});
