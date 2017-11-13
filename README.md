# Angular Paginator
Pagination for Angular Applications. Paginator uses [Bootstrap-4][Bootstrap4] template

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
  imports: [ AngularPaginatorModule ]
})
```

Import [bootstrap-4][Bootstrap4] into your application

Then in HTML

```html
<div *ngFor="let item of array | angularPaginator: { currentPage: currentPage }; let i = index">
    {{(currentPage - 1) * itemsPerPage + i +1}}. {{item}}
</div>

<app-angular-paginator (pageChange)="currentPage = $event"></app-angular-paginator>
```
### Paginator Pipe

angularPaginator pipe accepts

``` bash
{
  id: 'ANGULAR_PAGINATOR_DEFAULT',
  itemsPerPage: 10,
  currentPage: currentPage
}
```

### Paginator Component

Paginator component accepts

```html
<app-angular-paginator boundaryLinks="false" 
                       directionLinks="true"
                       maxSize="5"
                       rotate="true"
                       boundaryLinkNumbers="false"
                       forceEllipses="false"
                       size="sm"
                       id="ANGULAR_PAGINATOR_DEFAULT" 
                       firstText="First" 
                       previousText="Previous"
                       nextText="Next"
                       lastText="Last" 
                       screenReaderFirstText="First"
                       screenReaderPreviousText="Previous"
                       screenReaderNextText="Next"
                       screenReaderLastText="Last"
                       screenReaderPageText="Page"
                       screenReaderCurrentPageText="You`re on page"
                       screenReaderPaginationLabel="Pagination"
                       className="ANGULAR_PAGINATOR_DEFAULT"
                       autoHide="false"
                       (pageChange)="currentPage = $event">
</app-angular-paginator>
```

### Documentation
Check [wiki][wiki] for more information 

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[wiki]: https://github.com/Sibiraj-S/angular-paginator/wiki/angular-paginator
[Bootstrap4]: https://github.com/twbs/bootstrap
