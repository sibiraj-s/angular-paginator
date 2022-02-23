import { Component } from '@angular/core';
import { jsonArray } from '../data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent {
  currentPage = 1;
  itemsPerPage = 15;
  jsonArray = jsonArray;
}
