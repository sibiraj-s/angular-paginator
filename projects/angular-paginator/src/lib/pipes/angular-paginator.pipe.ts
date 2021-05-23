import { Pipe, PipeTransform } from '@angular/core';
import { AngularPaginatorService } from '../services/angular-paginator.service';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

/**
 * Pagination Pipe which paginates the array for the provided arguments such as `itemsPerPage` and `currentPage`
 */
@Pipe({
  name: 'angularPaginator'
})

export class AngularPaginatorPipe implements PipeTransform {
  /**
   *
   * @param angularPaginatorService service for angular pagiantor
   */
  constructor(private angularPaginatorService: AngularPaginatorService) { }

  /**
   * this pipes paginates the array for the provided arguments such as `itemsPerPage` and `currentPage`
   *
   * @param array input array for which the manipulation happens
   * @param args input arguments for the paginator pipe
   */
  transform(array: any, args?: any): any {

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
  createInstance(array: any, args: any): any {
    return {
      id: args.id ? args.id : this.angularPaginatorService.id,
      currentPage: args.currentPage ? args.currentPage : 1,
      itemsPerPage: args.itemsPerPage ? args.itemsPerPage : 10,
      totalItems: array.length
    };
  }
}
