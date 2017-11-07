# Angular Paginator
Pagination for Angular Applications.

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

Import [bootstrap-4](https://github.com/twbs/bootstrap) into your application

Then in HTML

```html
<div *ngFor="let item of array | angularPaginator: {currentPage: currentPage }; let i = index">
    {{(currentPage - 1) * itemsPerPage + i +1}}. {{item}}
</div>

<app-angular-paginator (pageChange)="currentPage = $event"></app-angular-paginator>
```

### Documentation
Check [wiki][wiki] for more information 

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[wiki]:https://github.com/Sibiraj-S/angular-paginator/wiki/angular-paginator
