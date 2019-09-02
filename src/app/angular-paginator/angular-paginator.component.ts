import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AngularPaginatorService } from './services/angular-paginator.service';

/**
 * The component that renders the Pagination component template, It also accepts the inputs for the Pagination component
 */
@Component({
  selector: 'angular-paginator',
  templateUrl: './angular-paginator.component.html',
  styleUrls: ['./angular-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AngularPaginatorComponent implements OnInit {

  /**
   * Whether to display First / Last buttons
   */
  @Input() boundaryLinks = false;
  /**
   * Whether to display Previous / Next buttons
   */
  @Input() directionLinks = true;
  /**
   * Limit number for pagination size, i.e., the maximum page numbers to be displayed
   */
  @Input() maxSize = 5;
  /**
   * Whether to keep current page in the middle of the visible ones
   */
  @Input() rotate = true;
  /**
   * Whether to always display the first and last page numbers.
   * If max-size is smaller than the number of pages, then the first and last page numbers are still shown with ellipses
   * in-between as necessary. NOTE: max-size refers to the center of the range.
   * This option may add up to 2 more numbers on each side of the displayed range for the end value and
   * what would be an ellipsis but is replaced by a number because it is sequential
   */
  @Input() boundaryLinkNumbers = false;
  /**
   * Also displays ellipses when rotate is true and maxSize is smaller than the number of pages forceEllipses
   */
  @Input() forceEllipses = false;
  /**
   * Use unique id when multiple paginations are being used on the same page.
   * By Default Paginator uses id `ANGULAR_PAGINATOR_DEFAULT`
   */
  @Input() id: string;
  /**
   * Text for first button
   */
  @Input() firstText = 'First';
  /**
   * Text for previous button
   */
  @Input() previousText = 'Previous';
  /**
   * Text for next button
   */
  @Input() nextText = 'Next';
  /**
   * Text for last button
   */
  @Input() lastText = 'Last';
  /**
   * Screen reader text for first button
   */
  @Input() screenReaderFirstText = 'First';
  /**
   * Screen reader text for previous button
   */
  @Input() screenReaderPreviousText = 'Previous';
  /**
   * Screen reader text for next button
   */
  @Input() screenReaderNextText = 'Next';
  /**
   * Screen reader text for lasr button
   */
  @Input() screenReaderLastText = 'Last';
  /**
   * Screen reader text for page numbers
   */
  @Input() screenReaderPageText = 'Page';
  /**
   * Screen reader text for current page
   */
  @Input() screenReaderCurrentPageText = 'You`re on page';
  /**
   * Screen reader text for the pagination component
   */
  @Input() screenReaderPaginationLabel = 'Pagination';
  /**
   * Adds custom class to the pagination element
   */
  @Input() className: string;
  /**
   * Hides the pagination component if the items are less than `itemsPerPage`
   */
  @Input() autoHide = false;
  /**
   * disables pagination component
   */
  @Input() disabled = false;

  /**
   * Emits an event whenever the current page is changed, It emits the current page number
   *
   * This event is originally picked up from `AngularPaginatorDirective`
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   *
   * @param angularPaginatorService service for angular paginator
   */
  constructor(private angularPaginatorService: AngularPaginatorService) { }

  ngOnInit() {

    // set default id if not provided
    this.id = this.id ? this.id : this.angularPaginatorService.id;

    // set default class if not provided
    this.className = this.className ? this.className : this.angularPaginatorService.id;
  }
}
