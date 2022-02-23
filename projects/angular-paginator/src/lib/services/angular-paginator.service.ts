import { Injectable, EventEmitter } from '@angular/core';

import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

@Injectable()
export class AngularPaginatorService {
  /** id is used to identify pagination instances */
  static id = 'ANGULAR_PAGINATOR_DEFAULT';

  /** instances is the collection of pagination componetns */
  instances: Record<string, AngularPaginatorInstance> = {};

  /** emits an event with instance id whenever the page number changes */
  change: EventEmitter<string> = new EventEmitter<string>();

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
  }

  /**
   * updates existing pagination instances available
   * and returns true if value has changed
   *
   * @param instance an unique pagination component
   */
  private updateInstance(instance: AngularPaginatorInstance): boolean {
    let updated = false;
    const currentInstance = this.instances[instance.id];

    for (const [k, v] of Object.entries(instance)) {
      const key = k as keyof AngularPaginatorInstance;

      if (
        key !== 'id'
        && currentInstance[k as keyof AngularPaginatorInstance] !== v
        && !updated
      ) {
        this.instances[instance.id] = {
          ...instance,
          id: instance.id,
        };
        updated = true;
      }
    }

    return updated;
  }

  /**
   * return instance with given id
   *
   * @param id unique id of the pagination component
   */
  getInstance(id: string): AngularPaginatorInstance {
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
