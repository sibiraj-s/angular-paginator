import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() screenReaderFirstText = 'First';
  @Input() screenReaderPreviousText = 'Previous';
  @Input() screenReaderNextText = 'Next';
  @Input() screenReaderLastText = 'Last';
  @Input() screenReaderPageText = 'Page';
  @Input() screenReaderCurrentPageText = 'You`re on page';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() className: string;
  @Input() autoHide = false;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _angularPaginatorService: AngularPaginatorService) { }

  ngOnInit() {

    // set default id if not provided
    this.id = this.id ? this.id : this._angularPaginatorService.id;

    // set default class if not provided
    this.className = this.className ? this.className : this._angularPaginatorService.id;

  }

}
