import { Component, ViewEncapsulation } from '@angular/core';
import { jsonArray } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'Angular Paginator';

  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 5;
  jsonArray = jsonArray;
}
