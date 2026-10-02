import { TestBed } from '@angular/core/testing';
import { runInInjectionContext, Injector } from '@angular/core';
import { AngularPaginatorPipe } from './angular-paginator.pipe';
import { AngularPaginatorService } from '../services/angular-paginator.service';

const data = [
  'Appple',
  'Apricot',
  'Avacado',
  'Banana',
  'Cherry',
  'Coconut',
  'Dates',
  'Fig',
  'Goa',
  'Mango',
  'Pineapple',
  'Papays',
  'Orange',
];

describe('AngularPaginatorPipe', () => {
  let pipe: AngularPaginatorPipe;
  let service: AngularPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularPaginatorService],
    });

    service = TestBed.inject(AngularPaginatorService);

    // Create pipe within injection context so inject() works
    pipe = runInInjectionContext(TestBed.inject(Injector), () => new AngularPaginatorPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform given input correctly with default values', () => {
    const output = pipe.transform(data);

    expect(output).toEqual(data.slice(0, 10));
    expect(output.length).toBe(10);
  });

  it('should register instance in service correctly', () => {
    const output = pipe.transform(data, { id: '123' });

    const instance = service.getInstance('123');

    expect(output).toBeTruthy();
    expect(instance).toBeTruthy();
  });

  it('should apply itemsPerPage correctly', () => {
    const output = pipe.transform(data, { itemsPerPage: 5 });

    expect(output).toEqual(data.slice(0, 5));
    expect(output.length).toBe(5);
  });

  it('should apply currentPage correctly', () => {
    const output = pipe.transform(data, { itemsPerPage: 5, currentPage: 2 });

    expect(output).toEqual(data.slice(5, 10));
    expect(output.length).toBe(5);
  });

  it('should register the instance with default values', () => {
    pipe.transform(data);

    expect(service.getInstance(AngularPaginatorService.id)).toEqual({
      id: AngularPaginatorService.id,
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: data.length,
    });
  });

  it('should register the instance with given values', () => {
    pipe.transform(data, { id: 'fruits', itemsPerPage: 5, currentPage: 2 });

    expect(service.getInstance('fruits')).toEqual({ id: 'fruits', currentPage: 2, itemsPerPage: 5, totalItems: 13 });
  });

  it('should return the remaining items on the last page', () => {
    const output = pipe.transform(data, { itemsPerPage: 5, currentPage: 3 });

    expect(output).toEqual(['Pineapple', 'Papays', 'Orange']);
  });

  it('should return an empty array for an empty input', () => {
    expect(pipe.transform([])).toEqual([]);
    expect(service.getInstance(AngularPaginatorService.id).totalItems).toBe(0);
  });

  it.each([null, undefined])('should return an empty array for %s input', (input) => {
    expect(pipe.transform(input)).toEqual([]);
    expect(service.getInstance(AngularPaginatorService.id).totalItems).toBe(0);
  });

  it('should return the first page for a page below the first page', () => {
    const output = pipe.transform(data, { itemsPerPage: 5, currentPage: -1 });

    expect(output).toEqual(data.slice(0, 5));
    // the requested page is kept so the paginator can emit the corrected page
    expect(service.getCurrentPage(AngularPaginatorService.id)).toBe(-1);
  });

  it('should return the last page for a page beyond the last page', () => {
    const output = pipe.transform(data, { itemsPerPage: 5, currentPage: 10 });

    expect(output).toEqual(data.slice(10));
    expect(service.getCurrentPage(AngularPaginatorService.id)).toBe(10);
  });
});
