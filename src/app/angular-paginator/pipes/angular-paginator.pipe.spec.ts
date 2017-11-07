import { AngularPaginatorPipe } from './angular-paginator.pipe';
import { AngularPaginatorService } from '../services/angular-paginator.service';

describe('AngularPaginatorPipe', () => {

  let service: AngularPaginatorService;

  it('create an instance', () => {
    const pipe = new AngularPaginatorPipe(service);
    expect(pipe).toBeTruthy();
  });
});
