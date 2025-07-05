import { Component, Input } from '@angular/core';

import { AngularPaginatorModule } from 'angular-paginator';
import { jsonArray } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, AngularPaginatorModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss'],
})

export class Pagination {
  @Input() id = 'DEFAULT_PAGINATION';
  currentPage = 1;
  itemsPerPage = 15;
  jsonArray = jsonArray;

  onKeyUp():void {
    // do nothing
  }
}
