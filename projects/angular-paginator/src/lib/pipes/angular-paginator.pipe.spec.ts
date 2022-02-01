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
]

describe('AngularPaginatorPipe', () => {
  const service: AngularPaginatorService = new AngularPaginatorService();

  it('create an instance', () => {
    const pipe = new AngularPaginatorPipe(service);
    expect(pipe).toBeTruthy();
  });

  it('should transform given input correctly with default values', () => {
    const pipe = new AngularPaginatorPipe(service);
    const output = pipe.transform(data)

    expect(output).toEqual(data.slice(0, 10))
    expect(output.length).toBe(10)
  })

  it('should register instance in service correctly', () => {
    const pipe = new AngularPaginatorPipe(service);
    const output = pipe.transform(data, { id: '123' })

    const instance = service.getInstance('123')

    expect(output).toBeTruthy()
    expect(instance).toBeTruthy()
  })

  it('should apply itemsPerPage correctly', () => {
    const pipe = new AngularPaginatorPipe(service);
    const output = pipe.transform(data, { itemsPerPage: 5 })

    expect(output).toEqual(data.slice(0, 5))
    expect(output.length).toBe(5)
  })

  it('should apply currentPage correctly', () => {
    const pipe = new AngularPaginatorPipe(service);
    const output = pipe.transform(data, { itemsPerPage: 5, currentPage: 2 })

    expect(output).toEqual(data.slice(5, 10))
    expect(output.length).toBe(5)
  })
});
