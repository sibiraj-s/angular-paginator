import { Component } from '@angular/core';
import { jsonArray } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-paginator';

  currentPage = 1;
  itemsPerPage = 10;
  maxSize = 5;
  jsonArray = jsonArray;
}
