import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AngularPaginatorService } from './services/angular-paginator.service';

@Component({
  selector: 'app-angular-paginator',
  templateUrl: './angular-paginator.component.html',
  styleUrls: ['./angular-paginator.component.scss']
})

export class AngularPaginatorComponent implements OnInit {

  @Input() boundaryLinks = false;
  @Input() directionLinks = true;
  @Input() maxSize = 5;
  @Input() rotate = true;
  @Input() boundaryLinkNumbers = false;
  @Input() forceEllipses = false;
  @Input() size: string;
  @Input() id: string;
  @Input() firstText = 'First';
  @Input() previousText = 'Previous';
  @Input() nextText = 'Next';
  @Input() lastText = 'Last';
  @Input() class: string;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _angularPaginatorService: AngularPaginatorService) { }

  setCustomTemplate() {

  }

  ngOnInit() {

    // set default id if not provided
    this.id = this.id ? this.id : this._angularPaginatorService.id;

    // set default class if not provided
    this.class = this.class ? this.class : this._angularPaginatorService.id;

  }

}
