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
  transform<T>(array: T[] | null | undefined, args?: PaginatorPipeArgs): T[] {
    const items = array ?? [];
    const instance: AngularPaginatorInstance = this.createInstance(items, args);

    // create pagination information
    this.angularPaginatorService.registerInstance(instance);

    // slice a valid page, the paginator directive emits the corrected page number
    const totalPages = Math.max(Math.ceil(instance.totalItems / instance.itemsPerPage), 1);
    const page = Math.min(Math.max(instance.currentPage, 1), totalPages);

    // set the slicing range
    const start = (page - 1) * instance.itemsPerPage;
    const end = page * instance.itemsPerPage;

    return items.slice(start, end);
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
