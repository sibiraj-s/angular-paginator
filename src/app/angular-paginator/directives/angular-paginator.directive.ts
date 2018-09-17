import { Directive, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AngularPaginatorService } from '../services/angular-paginator.service';
import { AngularPaginatorInstance, Page } from '../others/angular-paginator.interface';
import { Subject } from 'rxjs';

/**
 * This is the directive where the actual pagination takes place, it provides a sync between the
 * pipes and the pagination component
 */
@Directive({
  selector: 'appAngularPaginator, [appAngularPaginator]',
  exportAs: 'angularPaginator'
})

export class AngularPaginatorDirective implements OnInit, OnDestroy {

  /**
   * Whether to display First / Last buttons
   */
  @Input() boundaryLinks: boolean;
  /**
  * Whether to display Previous / Next buttons
  */
  @Input() directionLinks: boolean;
  /**
   * Limit number for pagination size, i.e., the maximum page numbers to be displayed
   */
  @Input() maxSize: number;
  /**
   * Whether to keep current page in the middle of the visible ones
   */
  @Input() rotate: boolean;
  /**
   * Whether to always display the first and last page numbers.
   * If max-size is smaller than the number of pages, then the first and last page numbers are still shown with ellipses
   * in-between as necessary. NOTE: max-size refers to the center of the range.
   * This option may add up to 2 more numbers on each side of the displayed range for the end value and
   * what would be an ellipsis but is replaced by a number because it is sequential
   */
  @Input() boundaryLinkNumbers: boolean;
  /**
   * Also displays ellipses when rotate is true and maxSize is smaller than the number of pages forceEllipses
   */
  @Input() forceEllipses: boolean;
  /**
   * Use unique id when multiple paginations are being used on the same page. By Default Paginator uses id `ANGULAR_PAGINATOR_DEFAULT`
   */
  @Input() id: string;

  currentPage: number;
  firstPage = 1;
  lastPage: number;
  pages: Page[] = [];

  private subscription: Subject<any> = new Subject();

  /**
   * Emits an event whenever the current page is changed, It emits the current page number
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

  /**
   *
   * @param _angularPaginatorService serivce for angular paginator
   * @param _changeDetectorRef for manual change detection
   */
  constructor(private _angularPaginatorService: AngularPaginatorService,
    private _changeDetectorRef: ChangeDetectorRef) {

    // subscribe to changes
    this.subscription = this._angularPaginatorService.change.subscribe(id => {
      if (id === this.id) {
        this.updatePages();
        this._changeDetectorRef.markForCheck();
      }
    });

  }

  /**
   * Navigate to prevoius page
   */
  toPreviousPage(): void {
    if (this.currentPage > this.firstPage) {
      this.setCurrentPage(this.currentPage - 1);
    }
    return;
  }

  /**
   * Navigate to next page
   */
  toNextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.setCurrentPage(this.currentPage + 1);
    }
    return;
  }

  /**
   * Navigate to first page
   */
  toFirstPage(): void {
    this.setCurrentPage(this.firstPage);
    return;
  }

  /**
   * Navigate to last page
   */
  toLastPage(): void {
    this.setCurrentPage(this.lastPage);
    return;
  }

  /**
   * Sets current page
   *
   * @param page page number to set as currentPage
   */
  setCurrentPage(page: number): void {
    if (page && this.currentPage !== page) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
    return;
  }

  /**
   * create page object used for template
   *
   * @param number page number
   * @param text page number, text to be displayed
   * @param isActive whether the page is active or not, true for currentPage
   */
  makePage(number: number, text: any, isActive: boolean): any {
    return {
      number: number,
      text: text,
      active: isActive
    };
  }

  /**
   *  create page array
   *
   * @param currentPage current page number
   * @param itemsPerPage total items per page
   * @param totalItems no of items for pagination, usually array length
   */
  getPages(currentPage: number, itemsPerPage: number, totalItems: number): any {
    const pages: any = [];

    // Default page limits
    const totalPages: number = this.lastPage = Math.ceil(totalItems / itemsPerPage);

    let startPage = 1;
    let endPage: number = totalPages;
    const isMaxSized: boolean = this.maxSize && this.maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {

      if (this.rotate) {

        // current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
        endPage = startPage + this.maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - this.maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;

        // adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    // add page number links
    for (let number = startPage; number <= endPage; number++) {
      const page = this.makePage(number, number, number === currentPage);
      pages.push(page);
    }

    // add links to move between page sets
    if (isMaxSized && this.maxSize > 0 && (!this.rotate || this.forceEllipses || this.boundaryLinkNumbers)) {
      if (startPage > 1) {

        if (!this.boundaryLinkNumbers || startPage > 3) { // need ellipsis for all options unless range is too close to beginning
          const previousPageSet = this.makePage(startPage - 1, '...', false);
          pages.unshift(previousPageSet);
        }

        if (this.boundaryLinkNumbers) {

          if (startPage === 3) { // need to replace ellipsis when the buttons would be sequential
            const secondPageLink = this.makePage(2, '2', false);
            pages.unshift(secondPageLink);
          }

          // add the first page
          const firstPageLink = this.makePage(1, '1', false);
          pages.unshift(firstPageLink);
        }
      }

      if (endPage < totalPages) {

        if (!this.boundaryLinkNumbers || endPage < totalPages - 2) { // need ellipsis for all options unless range is too close to end
          const nextPageSet = this.makePage(endPage + 1, '...', false);
          pages.push(nextPageSet);
        }

        if (this.boundaryLinkNumbers) {

          if (endPage === totalPages - 2) { // need to replace ellipsis when the buttons would be sequential
            const secondToLastPageLink = this.makePage(totalPages - 1, totalPages - 1, false);
            pages.push(secondToLastPageLink);
          }

          // add the last page
          const lastPageLink = this.makePage(totalPages, totalPages, false);
          pages.push(lastPageLink);
        }
      }
    }
    return pages;
  }

  /**
   * Updates the pagination component
   */
  updatePages(): void {
    const instance: AngularPaginatorInstance = this._angularPaginatorService.getInstance(this.id);

    const correctedCurrentPage = this.outOfBoundCorrection(instance);

    if (correctedCurrentPage !== instance['currentPage'] || this.currentPage !== instance['currentPage']) {
      this.setCurrentPage(correctedCurrentPage);
    }

    this.pages = this.getPages(instance.currentPage, instance.itemsPerPage, instance.totalItems);

    return;
  }

  /**
   * Check if currentPage is out of bound with totalPages
   *
   * @param instance instance for which the range is to be corrected
   */
  outOfBoundCorrection(instance: AngularPaginatorInstance): number {

    const totalPages = Math.ceil(instance['totalItems'] / instance['itemsPerPage']);

    if (totalPages < instance['currentPage'] && 0 < totalPages) {
      return totalPages;
    } else if (instance['currentPage'] < 1) {
      return 1;
    }

    return instance['currentPage'];
  }

  /**
   * check if there is any instance registered with the id
   */
  isValidId(): void {

    if (!this._angularPaginatorService.getInstance(this.id)) {
      throw new Error('There is no instance registered with id `' + this.id + '`');
    }

    return;
  }

  ngOnInit() {
    this.isValidId();
    this.updatePages();
  }

  ngOnDestroy() {
    /** destroy the subscription when the directive is destroyed */
    this.subscription.unsubscribe();
  }

}
