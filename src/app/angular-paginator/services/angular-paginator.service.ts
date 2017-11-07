import { Injectable, EventEmitter } from '@angular/core';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

@Injectable()
export class AngularPaginatorService {

  id = 'ANGULAR_PAGINATOR_DEFAULT';

  instances: any = {};
  collection: any = [];

  change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  registerInstance(instance: AngularPaginatorInstance) {

    if (!this.instances[instance.id]) {
      this.instances[instance.id] = instance;
      this.change.emit(instance.id);
    } else {
      const changed = this.updateInstance(instance);
      if (changed) {
        this.change.emit(instance.id);
      }
    }

  }

  /*
   * updates existing pagination instances available
   * and returns true if value has changed
   */
  updateInstance(instance: AngularPaginatorInstance) {

    for (const key in instance) {
      if (instance[key] !== this.instances[instance['id']][key]) {
        this.instances[instance['id']][key] = instance[key];
        return true;
      }
    }

    return false;
  }

  // return instance with given id
  getInstance(id: string) {
    return this.instances[id];
  }

}
