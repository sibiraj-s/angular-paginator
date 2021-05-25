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

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install angular-paginator --save
# or
yarn add angular-paginator
```

### Usage

Import `angular-paginator` module

```typescript
import { AngularPaginatorModule } from 'angular-paginator';

@NgModule({
  imports: [AngularPaginatorModule],
})
export class AppModule {}
```

Then in HTML

```html
<div *ngFor="let item of array | angularPaginator: { currentPage: currentPage }; let i = index">
  {{(currentPage - 1) * itemsPerPage + i +1}}. {{item}}
</div>

<angular-paginator (pageChange)="currentPage = $event"></angular-paginator>
```

### Paginator Pipe

angularPaginator pipe accepts

```bash
{
  id: 'ANGULAR_PAGINATOR_DEFAULT',
  itemsPerPage: 10,
  currentPage: currentPage
}
```

### Paginator Component

Paginator component accepts

```html
<angular-paginator
  [maxSize]="5"
  [rotate]="true"
  [boundaryLinkNumbers]="false"
  [forceEllipses]="false"
  id="ANGULAR_PAGINATOR_DEFAULT"
  (pageChange)="currentPage = $event"
>
</angular-paginator>
```

- **id:** Use unique id when multiple paginations are being used on the same page
- **maxSize:** Limit number for pagination size
- **rotate:** Whether to keep the current page in the middle of the visible ones
- **boundaryLinkNumbers:** Whether to always display the first and last page numbers. If max-size is smaller than the number of pages, then the first and last page numbers are still shown with ellipses in-between as necessary. NOTE: max-size refers to the center of the range. This option may add up to 2 more numbers on each side of the displayed range for the end value and what would be an ellipsis but is replaced by a number because it is sequential
- **forceEllipses:** Also displays ellipses when rotate is true and maxSize is smaller than the number of pages

### Demo

Demo at stackblitz [angular-paginator](https://angular-paginator.stackblitz.io)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
