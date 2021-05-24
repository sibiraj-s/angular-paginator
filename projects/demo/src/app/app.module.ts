import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';

import { AngularPaginatorModule } from 'angular-paginator';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
