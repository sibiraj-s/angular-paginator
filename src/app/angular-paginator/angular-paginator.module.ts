import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularPaginatorComponent } from './angular-paginator.component';
import { AngularPaginatorPipe } from './pipes/angular-paginator.pipe';
import { AngularPaginatorDirective } from './directives/angular-paginator.directive';
import { AngularPaginatorService } from './services/angular-paginator.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AngularPaginatorService],
  declarations: [AngularPaginatorComponent, AngularPaginatorPipe, AngularPaginatorDirective],
  exports: [AngularPaginatorComponent, AngularPaginatorPipe, AngularPaginatorDirective]
})

export class AngularPaginatorModule { }
