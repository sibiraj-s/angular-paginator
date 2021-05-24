import { EventEmitter } from '@angular/core';

import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

const DEFAULT_ID = 'ANGULAR_PAGINATOR_DEFAULT';

export class AngularPaginatorMockService {
  instances: Record<string, AngularPaginatorInstance> = {
    [DEFAULT_ID]: {
      id: DEFAULT_ID,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100,
    },
  };

  change: EventEmitter<string> = new EventEmitter<string>();

  // return instance with given id
  getInstance(id: string): AngularPaginatorInstance {
    return this.instances[id];
  }

  // return currentPage for given id
  getCurrentPage(id: string): number {
    return this.instances[id].currentPage;
  }
}
