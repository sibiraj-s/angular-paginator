import { Component, OnInit } from '@angular/core';
import { jsonArray } from './data';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit {
  title = 'Angular Paginator';
  latestRelease: any = {};

  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 5;
  jsonArray = jsonArray;

  constructor(private _appService: AppService) { }

  getLatestRelease() {
    this._appService.getLatestRelease().subscribe(
      data => this.latestRelease = data,
      error => { console.log(error); },
      () => {
        // console.log('latest release: ' + this.latestRelease['name']);
      });
  }

  ngOnInit() {
    this.getLatestRelease();
  }
}
