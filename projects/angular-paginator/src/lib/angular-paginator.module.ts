import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularPaginatorPipe } from './pipes/angular-paginator.pipe';
import { AngularPaginatorDirective } from './directives/angular-paginator.directive';
import { AngularPaginatorService } from './services/angular-paginator.service';

@NgModule({
  imports: [CommonModule],
  providers: [AngularPaginatorService],
  declarations: [AngularPaginatorPipe, AngularPaginatorDirective],
  exports: [AngularPaginatorDirective, AngularPaginatorPipe],
})

export class AngularPaginatorModule { }
