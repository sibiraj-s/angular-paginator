import { Component } from '@angular/core';
import { Pagination } from './pagination/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Pagination],
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'Angular Paginator';
}
