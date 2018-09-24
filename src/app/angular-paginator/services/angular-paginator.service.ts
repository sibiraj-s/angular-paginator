import { Injectable, EventEmitter } from '@angular/core';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

@Injectable()
export class AngularPaginatorService {
  /** id is used to identify pagination instances */
  id = 'ANGULAR_PAGINATOR_DEFAULT';

  /** instances is the collection of pagination componetns */
  instances: any = {};

  /** emits an event with instance id whenever the page number changes */
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * creates an instance for every pipe differentiated with id
   *
   * @param instance each instance refers to a unique pagination component
   */
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

  /**
   * updates existing pagination instances available
   * and returns true if value has changed
   *
   * @param instance an unique pagination component
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

  /**
   * return instance with given id
   *
   * @param id unique id of the pagination component
   */
  getInstance(id: string): any {
    return this.instances[id];
  }

  /**
   * return currentPage for given id
   *
   * @param id unique id of the pagination component
   */
  getCurrentPage(id: string): number {
    return this.instances[id].currentPage;
  }
}
