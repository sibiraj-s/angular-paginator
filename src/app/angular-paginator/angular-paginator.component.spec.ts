import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPaginatorComponent } from './angular-paginator.component';
import { AngularPaginatorDirective } from './directives/angular-paginator.directive';
import { AngularPaginatorService } from './services/angular-paginator.service';
import { AngularPaginatorMockService } from './testing/angular-paginator.testing.helpers';

describe('AngularPaginatorComponent', () => {
  let component: AngularPaginatorComponent;
  let fixture: ComponentFixture<AngularPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularPaginatorService, useClass: AngularPaginatorMockService }],
      declarations: [AngularPaginatorComponent, AngularPaginatorDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
