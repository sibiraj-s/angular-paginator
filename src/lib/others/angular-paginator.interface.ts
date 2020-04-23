/**
 * structure for the paginator instance
 */

export interface AngularPaginatorInstance {
  /** id of the pagination instance */
  id?: string;
  /** total numeber of items to be paginated. usually array length */
  totalItems: number;
  /** current page number */
  currentPage: number;
  /** total items to be shown per page */
  itemsPerPage: number;
}

/**
 * structure for each page item
 */

export interface Page {
  /** number of the page */
  number: number;
  /** text to be displayed for the page numeber */
  text: any;
  /** whether the page is active or not */
  active: boolean;
}
