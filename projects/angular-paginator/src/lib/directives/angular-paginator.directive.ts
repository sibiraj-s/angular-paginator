import {
  Directive, OnInit, OnDestroy, Input, Output, EventEmitter,
} from '@angular/core';
import { AngularPaginatorService } from '../services/angular-paginator.service';
import { AngularPaginatorInstance, Page } from '../others/angular-paginator.interface';
import { Subscription } from 'rxjs';

/**
 * This is the directive where the actual pagination takes place, it provides a sync between the
 * pipes and the pagination component
 */
@Directive({
  selector: 'angularPaginator, [angularPaginator]',
  exportAs: 'angularPaginator',
})

export class AngularPaginatorDirective implements OnInit, OnDestroy {
  /**
   * Use unique id when multiple paginations are being used on the same page.
   * By Default Paginator uses id `ANGULAR_PAGINATOR_DEFAULT`
   */
  @Input() id: string = AngularPaginatorService.id;

  /**
   * Limit number for pagination size, i.e., the maximum page numbers to be displayed
   */
  @Input() maxSize?: number;

  /**
   * Whether to keep current page in the middle of the visible ones
   */
  @Input() rotate = false;

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

  currentPage!: number;
  firstPage = 1;
  lastPage!: number;
  pages: Page[] = [];

  private subscription: Subscription;

  /**
   * Emits an event whenever the current page is changed, It emits the current page number
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

  /**
   *
   * @param angularPaginatorService serivce for angular paginator
   */
  constructor(private angularPaginatorService: AngularPaginatorService) {
    // subscribe to changes
    this.subscription = this.angularPaginatorService.change.subscribe((id: string) => {
      if (id === this.id) {
        this.updatePages();
      }
    });
  }

  /**
   * Navigate to prevoius page
   */
  toPreviousPage(): void {
    if (this.currentPage > this.firstPage) {
      this.setPage(this.currentPage - 1);
    }
  }

  /**
   * Navigate to next page
   */
  toNextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.setPage(this.currentPage + 1);
    }
  }

  /**
   * Navigate to first page
   */
  toFirstPage(): void {
    this.setPage(this.firstPage);
  }

  /**
   * Navigate to last page
   */
  toLastPage(): void {
    this.setPage(this.lastPage);
  }

  /**
   * Sets current page
   *
   * @param page page number to set as currentPage
   */
  setCurrentPage(page: number): void {
    this.setPage(page);
  }

  /**
   *
   * @param page  page number to set
   */
  private setPage(page: number): void {
    if (page && this.currentPage !== page) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  /**
   * create page object used for template
   *
   * @param pageNumber page number
   * @param text page number, text to be displayed
   * @param isActive whether the page is active or not, true for currentPage
   */
  private makePage(pageNumber: number, text: string, isActive: boolean): Page {
    return {
      number: pageNumber,
      text,
      active: isActive,
    };
  }

  /**
   *  computes the page limit
   *
   * @param currentPage current page number
   * @param itemsPerPage total items per page
   * @param totalItems no of items for pagination, usually array length
   */
  private computePageLimits(currentPage: number, totalItems: number, itemsPerPage: number) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Default page limits
    let startPage = 1;
    let endPage = totalPages;

    const isMaxSized = this.maxSize ? this.maxSize < totalPages : false;

    // recompute if maxSize
    if (isMaxSized && this.maxSize) {
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
        startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;

        // adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    return {
      startPage,
      endPage,
      totalPages,
      isMaxSized,
    };
  }

  /**
   *  create page array
   *
   * @param currentPage current page number
   * @param itemsPerPage total items per page
   * @param totalItems no of items for pagination, usually array length
   */
  private getPages(currentPage: number, itemsPerPage: number, totalItems: number): Page[] {
    const pages: Page[] = [];

    const pageLimits = this.computePageLimits(currentPage, totalItems, itemsPerPage);
    const { startPage, endPage, totalPages, isMaxSized } = pageLimits;

    this.lastPage = totalPages;

    // add page number links
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
      const page = this.makePage(pageNumber, pageNumber.toString(), pageNumber === currentPage);
      pages.push(page);
    }

    // add links to move between page sets
    if (
      isMaxSized
      && (this.maxSize && this.maxSize > 0)
      && (!this.rotate || this.forceEllipses || this.boundaryLinkNumbers)
    ) {
      if (startPage > 1) {
        // need ellipsis for all options unless range is too close to beginning
        if (!this.boundaryLinkNumbers || startPage > 3) {
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
        // need ellipsis for all options unless range is too close to end
        if (!this.boundaryLinkNumbers || endPage < totalPages - 2) {
          const nextPageSet = this.makePage(endPage + 1, '...', false);
          pages.push(nextPageSet);
        }

        if (this.boundaryLinkNumbers) {
          // need to replace ellipsis when the buttons would be sequential
          if (endPage === totalPages - 2) {
            const secondToLastPageLink = this.makePage(totalPages - 1, (totalPages - 1).toString(), false);
            pages.push(secondToLastPageLink);
          }

          // add the last page
          const lastPageLink = this.makePage(totalPages, totalPages.toString(), false);
          pages.push(lastPageLink);
        }
      }
    }
    return pages;
  }

  /**
   * Updates the pagination component
   */
  private updatePages(): void {
    const instance: AngularPaginatorInstance = this.angularPaginatorService.getInstance(this.id);

    const correctedCurrentPage = this.outOfBoundCorrection(instance);

    if (correctedCurrentPage !== instance.currentPage || this.currentPage !== instance.currentPage) {
      this.setPage(correctedCurrentPage);
    }

    this.pages = this.getPages(instance.currentPage, instance.itemsPerPage, instance.totalItems);
  }

  /**
   * Check if currentPage is out of bound with totalPages
   *
   * @param instance instance for which the range is to be corrected
   */
  private outOfBoundCorrection(instance: AngularPaginatorInstance): number {
    const totalPages = Math.ceil(instance.totalItems / instance.itemsPerPage);

    if (totalPages < instance.currentPage && totalPages > 0) {
      return totalPages;
    } else if (instance.currentPage < 1) {
      return 1;
    }

    return instance.currentPage;
  }

  /**
   * check if there is any instance registered with the id
   */
  isValidId(): void {
    if (!this.angularPaginatorService.getInstance(this.id)) {
      throw new Error(`There is no instance registered with id \`${this.id}\``);
    }
  }

  ngOnInit(): void {
    this.isValidId();
    this.updatePages();
  }

  ngOnDestroy(): void {
    /** destroy the subscription when the directive is destroyed */
    this.subscription.unsubscribe();
  }
}
