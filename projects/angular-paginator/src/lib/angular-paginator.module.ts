import { NgModule } from '@angular/core';

import { AngularPaginatorPipe } from './pipes/angular-paginator.pipe';
import { AngularPaginatorDirective } from './directives/angular-paginator.directive';

@NgModule({
  imports: [AngularPaginatorDirective, AngularPaginatorPipe],
  exports: [AngularPaginatorDirective, AngularPaginatorPipe],
})

export class AngularPaginatorModule { }
