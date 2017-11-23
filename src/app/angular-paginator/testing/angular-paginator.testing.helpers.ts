import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class AngularPaginatorMockService {

    id = 'ANGULAR_PAGINATOR_DEFAULT';

    instances: any = {
        [this.id]: {
            id: this.id,
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: 100
        }
    };

    change: EventEmitter<string> = new EventEmitter<string>();

    // return instance with given id
    getInstance(id: string): any {
        return this.instances[id];
    }

    // return currentPage for given id
    getCurrentPage(id: string): number {
        return this.instances[id].currentPage;
    }

}
