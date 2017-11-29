import { Component, OnInit, OnDestroy } from '@angular/core';
import { jsonArray } from './data';
import { AppService } from './app.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Angular Paginator';
  latestRelease: any = {};
  private subscription: Subject<any> = new Subject();

  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 5;
  jsonArray = jsonArray;

  constructor(private _appService: AppService) { }

  getLatestRelease() {
    this.subscription = this._appService.getLatestRelease().subscribe(
      data => this.latestRelease = data,
      error => { console.log(error); },
      () => {
        console.log('latest release: ' + this.latestRelease['name']);
        this.subscription.unsubscribe();
      });
  }

  ngOnInit() {
    this.getLatestRelease();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
