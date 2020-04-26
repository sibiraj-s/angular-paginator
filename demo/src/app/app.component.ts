import { Component } from '@angular/core';
import { jsonArray } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Angular Paginator';
  currentPage = 1;
  itemsPerPage = 15;
  jsonArray = jsonArray;

  onBrandClick(e: MouseEvent): void {
    e.preventDefault();
  }
}
