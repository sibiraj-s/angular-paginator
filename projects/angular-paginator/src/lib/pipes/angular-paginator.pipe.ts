import { Pipe, PipeTransform, inject } from '@angular/core';

import { AngularPaginatorService } from '../services/angular-paginator.service';
import { AngularPaginatorInstance, PaginatorPipeArgs } from '../others/angular-paginator.interface';

/**
 * Pagination Pipe which paginates the array for the provided arguments such as `itemsPerPage` and `currentPage`
 */
@Pipe({
  name: 'angularPaginator',
  standalone: true,
})

export class AngularPaginatorPipe implements PipeTransform {
  private angularPaginatorService = inject(AngularPaginatorService);

  /**
   * this pipes paginates the array for the provided arguments such as `itemsPerPage` and `currentPage`
   *
   * @param array input array for which the manipulation happens
   * @param args input arguments for the paginator pipe
   */
  transform<T>(array: T[], args?: PaginatorPipeArgs): T[] {
    const instance: AngularPaginatorInstance = this.createInstance(array, args);

    // create pagination information
    this.angularPaginatorService.registerInstance(instance);

    // set the slicing range
    const start = (instance.currentPage - 1) * instance.itemsPerPage;
    const end = instance.currentPage * instance.itemsPerPage;

    return array.slice(start, end);
  }

  /**
   * create an instance for each pipe
   *
   * @param array input array for which the manipulation happens
   * @param args input arguments for the paginator pipe
   */
  private createInstance(array: unknown[], args?: PaginatorPipeArgs): AngularPaginatorInstance {
    return {
      id: args?.id ? args.id : AngularPaginatorService.id,
      currentPage: args?.currentPage ? args.currentPage : 1,
      itemsPerPage: args?.itemsPerPage ? args.itemsPerPage : 10,
      totalItems: array.length,
    };
  }
}
