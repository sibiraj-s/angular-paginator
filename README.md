<p align="center">
  <a href="https://github.com/sibiraj-s/angular-paginator">
   <img src="./assets/angular.png" alt="angularPaginator" width="350">
  </a>
</p>
<h1 align="center">Angular Paginator</h1>
<p align="center">Pagination for Angular applications</p>
<p align="center">
  <a href="https://github.com/sibiraj-s/angular-paginator/actions">
    <img alt="Build Status" src="https://github.com/sibiraj-s/angular-paginator/workflows/Tests/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/angular-paginator">
    <img alt="npm version" src="https://badgen.net/npm/v/angular-paginator">
  </a>
  <a href="https://www.npmjs.com/package/angular-paginator">
    <img alt="npm downloads" src="https://badgen.net/npm/dt/angular-paginator">
  </a>
  <a href="https://github.com/sibiraj-s/angular-paginator/blob/master/LICENSE">
    <img alt="license" src="https://badgen.net/github/license/sibiraj-s/angular-paginator">
  </a>
</p>

## Getting Started

[edit in stackblitz](https://stackblitz.com/edit/angular-paginator)

### Installation

Install via package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install angular-paginator --save
# or
yarn add angular-paginator
```

### Usage

Import the `angular-paginator` module

```ts
import { AngularPaginatorModule } from 'angular-paginator';

@NgModule({
  imports: [AngularPaginatorModule],
})
export class AppModule {}
```

and in the template

```html
<div *ngFor="let item of array | angularPaginator: { currentPage: currentPage }; let i = index">
  {{(currentPage - 1) * itemsPerPage + i +1}}. {{item}}
</div>

<angular-paginator (pageChange)="currentPage = $event"></angular-paginator>
```

### Paginator Pipe

The `angularPaginator` pipe accepts

```bash
{
  id: 'ANGULAR_PAGINATOR_DEFAULT',
  itemsPerPage: 10,
  currentPage: currentPage
}
```

- **id:** The default id is `ANGULAR_PAGINATOR_DEFAULT` when not specified. This is optional. Provide a unique id when multiple pagination instances are being used.
- **itemsPerPage:** Number of items per page
- **currentPage:** Current page number

> [!IMPORTANT]
> When using an id, ensure to provide the same id in both the pipe and directive of the same instance.

### Paginator Directive

```html
<angular-paginator
  id="ANGULAR_PAGINATOR_DEFAULT"
  [maxSize]="5"
  [rotate]="true"
  [boundaryLinkNumbers]="false"
  [forceEllipses]="false"
  (pageChange)="currentPage = $event"
  #paginator="angularPaginator"
>
</angular-paginator>
```

- **id:** The default id is `ANGULAR_PAGINATOR_DEFAULT` when not specified. This is optional. This must be provided if the id is specified in the pipe and should be the same as the pipe id
- **maxSize:** Limit number for pagination size
- **rotate:** Whether to keep the current page in the middle of the visible ones
- **boundaryLinkNumbers:** Whether to always display the first and last page numbers. If maxSize is smaller than the number of pages, then the first and last page numbers are still shown with ellipses in-between as necessary.
- **forceEllipses:** Also displays ellipses when rotate is true and maxSize is smaller than the number of pages

> [!NOTE]
> maxSize refers to the center of the range. This option may add up to 2 more numbers on each side of the displayed range for the end value and what would be an ellipsis but is replaced by a number because it is sequential

You can get access to the pagination instance(directive's api) using `#paginator="angularPaginator"`. The following are the methods/properties available via the API

- **pages** - Array of page objects.

```ts
interface Page {
  number: number;
  text: string;
  active: boolean;
}
```

- **toPreviousPage()** - Sets the current page to previous (`currentPage - 1`)
- **toNextPage()** - Sets the current page to next (`currentPage + 1`)
- **toFirstPage()** - Sets the first page as current
- **toLastPage()** - Sets the last page as current
- **setCurrentPage(val)** - Sets the given page as current page.
- **currentPage** - Returns the current page number
- **firstPage** - Returns the first page number
- **lastPage** - Returns the last page number

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
