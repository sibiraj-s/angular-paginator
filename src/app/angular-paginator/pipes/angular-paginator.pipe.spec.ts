import { AngularPaginatorPipe } from './angular-paginator.pipe';
import { AngularPaginatorService } from '../services/angular-paginator.service';

describe('AngularPaginatorPipe', () => {

  const service: AngularPaginatorService = new AngularPaginatorService;

  it('create an instance', () => {
    const pipe = new AngularPaginatorPipe(service);
    expect(pipe).toBeTruthy();
  });
});
