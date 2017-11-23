import { Injectable, EventEmitter } from '@angular/core';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

@Injectable()
export class AngularPaginatorService {

  id = 'ANGULAR_PAGINATOR_DEFAULT';

  instances: any = {};
  collection: any = [];

  change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  registerInstance(instance: AngularPaginatorInstance): void {

    if (!this.instances[instance.id]) {
      this.instances[instance.id] = instance;
      this.change.emit(instance.id);
    } else {
      const changed = this.updateInstance(instance);
      if (changed) {
        this.change.emit(instance.id);
      }
    }

    return;
  }

  /*
   * updates existing pagination instances available
   * and returns true if value has changed
   */
  updateInstance(instance: AngularPaginatorInstance): boolean {

    for (const key in instance) {
      if (instance[key] !== this.instances[instance['id']][key]) {
        this.instances[instance['id']][key] = instance[key];
        return true;
      }
    }

    return false;
  }

  // return instance with given id
  getInstance(id: string): any {
    return this.instances[id];
  }

  // return currentPage for given id
  getCurrentPage(id: string): number {
    return this.instances[id].currentPage;
  }

}
