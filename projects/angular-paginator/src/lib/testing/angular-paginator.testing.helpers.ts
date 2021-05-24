import { EventEmitter } from '@angular/core';

import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

export class AngularPaginatorMockService {
  id = 'ANGULAR_PAGINATOR_DEFAULT';

  instances: Record<string, AngularPaginatorInstance> = {
    [this.id]: {
      id: this.id,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100
    }
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
