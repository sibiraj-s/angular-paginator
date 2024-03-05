import { Component } from '@angular/core';

import { AngularPaginatorModule } from 'angular-paginator';
import { jsonArray } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, AngularPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent {
  currentPage = 1;
  itemsPerPage = 15;
  jsonArray = jsonArray;

  onKeyUp():void {
    // do nothing
  }
}
