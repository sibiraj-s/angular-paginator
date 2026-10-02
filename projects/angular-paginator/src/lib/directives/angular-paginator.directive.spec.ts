import { Component, ErrorHandler, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularPaginatorDirective } from './angular-paginator.directive';
import { AngularPaginatorModule } from '../angular-paginator.module';

const range = (length: number) => Array.from({ length }, (_, i) => i + 1);

@Component({
  imports: [AngularPaginatorModule, NgTemplateOutlet],
  template: `
    <ng-template #pager>
      <nav
        angularPaginator
        #paginator="angularPaginator"
        id="test"
        [maxSize]="maxSize()"
        [rotate]="rotate()"
        [forceEllipses]="forceEllipses()"
        [boundaryLinkNumbers]="boundaryLinkNumbers()"
        (pageChange)="onPageChange($event)"
      >
        @for (page of paginator.pages; track $index) {
          <span class="page" [class.active]="page.active">{{ page.text }}</span>
        }
      </nav>
    </ng-template>

    @if (pagerFirst) {
      <ng-container [ngTemplateOutlet]="pager" />
    }

    @if (withList) {
      @for (
        item of items() | angularPaginator: { id: 'test', itemsPerPage: itemsPerPage(), currentPage: currentPage() };
        track $index
      ) {
        <span class="item">{{ item }}</span>
      }
    }

    @if (!pagerFirst) {
      <ng-container [ngTemplateOutlet]="pager" />
    }
  `,
})
class Host {
  pagerFirst = false;
  withList = true;
  items = signal(range(100));
  itemsPerPage = signal(10);
  currentPage = signal(1);
  maxSize = signal<number | undefined>(undefined);
  rotate = signal(false);
  forceEllipses = signal(false);
  boundaryLinkNumbers = signal(false);

  emitted: number[] = [];
  paginator = viewChild.required(AngularPaginatorDirective);

  onPageChange(page: number): void {
    this.emitted.push(page);
    this.currentPage.set(page);
  }
}

type Options = Partial<{
  pagerFirst: boolean;
  withList: boolean;
  items: number[];
  itemsPerPage: number;
  currentPage: number;
  maxSize: number;
  rotate: boolean;
  forceEllipses: boolean;
  boundaryLinkNumbers: boolean;
}>;

const flush = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve);
  });

const tick = async (fixture: ComponentFixture<unknown>) => {
  await flush();
  await fixture.whenStable();
  fixture.detectChanges();
};

/** flush the async pageChange emitter and the change detection it schedules */
const settle = async (fixture: ComponentFixture<unknown>) => {
  await tick(fixture);
  await tick(fixture);
  await tick(fixture);
};

const createHost = (options: Options = {}) => {
  const fixture = TestBed.createComponent(Host);
  const host = fixture.componentInstance;

  host.pagerFirst = options.pagerFirst ?? host.pagerFirst;
  host.withList = options.withList ?? host.withList;
  host.items.set(options.items ?? host.items());
  host.itemsPerPage.set(options.itemsPerPage ?? host.itemsPerPage());
  host.currentPage.set(options.currentPage ?? host.currentPage());
  host.maxSize.set(options.maxSize ?? host.maxSize());
  host.rotate.set(options.rotate ?? host.rotate());
  host.forceEllipses.set(options.forceEllipses ?? host.forceEllipses());
  host.boundaryLinkNumbers.set(options.boundaryLinkNumbers ?? host.boundaryLinkNumbers());

  return fixture;
};

const setup = async (options: Options = {}) => {
  const fixture = createHost(options);
  const host = fixture.componentInstance;

  fixture.detectChanges();

  const element: HTMLElement = fixture.nativeElement;

  /** rendered page texts, the active page is suffixed with `*` */
  const pages = () =>
    Array.from(element.querySelectorAll('.page')).map(
      (page) => `${page.textContent?.trim()}${page.classList.contains('active') ? '*' : ''}`,
    );

  const items = () => Array.from(element.querySelectorAll('.item')).map((item) => Number(item.textContent));

  const update = async (fn: () => void) => {
    fn();
    fixture.detectChanges();
    await settle(fixture);
  };

  await settle(fixture);

  return { fixture, host, paginator: host.paginator(), pages, items, update };
};

describe('AngularPaginatorDirective default behaviour', () => {
  it('renders all pages with the first page active', async () => {
    const { pages, items, paginator } = await setup();

    expect(pages()).toEqual(['1*', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    expect(items()).toEqual(range(10));
    expect(paginator.currentPage).toBe(1);
    expect(paginator.firstPage).toBe(1);
    expect(paginator.lastPage).toBe(10);
  });

  it('does not emit pageChange on initialization', async () => {
    const { host } = await setup({ currentPage: 4 });

    expect(host.emitted).toEqual([]);
  });

  it('renders a partial last page', async () => {
    const { pages, items, paginator } = await setup({ items: range(25), currentPage: 3 });

    expect(pages()).toEqual(['1', '2', '3*']);
    expect(items()).toEqual([21, 22, 23, 24, 25]);
    expect(paginator.lastPage).toBe(3);
  });

  it('renders no pages for an empty list', async () => {
    const { pages, items, paginator, host } = await setup({ items: [] });

    expect(pages()).toEqual([]);
    expect(items()).toEqual([]);
    expect(paginator.lastPage).toBe(0);
    expect(host.emitted).toEqual([]);
  });

  it('reports an error when no pipe is registered with the id', async () => {
    const handleError = vi.fn();
    TestBed.configureTestingModule({ providers: [{ provide: ErrorHandler, useValue: { handleError } }] });

    const fixture = createHost({ withList: false });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handleError).toHaveBeenCalledWith(new Error('There is no instance registered with id `test`'));
  });

  it('works when the paginator is placed before the list', async () => {
    const { pages, items, host, update } = await setup({ currentPage: 2, pagerFirst: true });

    expect(pages()).toEqual(['1', '2*', '3', '4', '5', '6', '7', '8', '9', '10']);
    expect(items()).toEqual(range(10).map((i) => i + 10));
    expect(host.emitted).toEqual([]);

    await update(() => host.paginator().toNextPage());

    expect(pages()).toEqual(['1', '2', '3*', '4', '5', '6', '7', '8', '9', '10']);
    expect(items()[0]).toBe(21);
  });
});

describe('AngularPaginatorDirective maxSize', () => {
  it('shows all pages when maxSize is not smaller than the number of pages', async () => {
    const { pages } = await setup({ maxSize: 10 });

    expect(pages()).toEqual(['1*', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  it('paginates the page numbers in sets with ellipses', async () => {
    const { pages, paginator } = await setup({ maxSize: 5 });

    expect(pages()).toEqual(['1*', '2', '3', '4', '5', '...']);
    expect(paginator.pages.at(-1)?.number).toBe(6);
  });

  it('shows the previous set ellipsis on later sets', async () => {
    const { pages, paginator } = await setup({ maxSize: 5, currentPage: 7 });

    expect(pages()).toEqual(['...', '6', '7*', '8', '9', '10']);
    expect(paginator.pages[0].number).toBe(5);
  });

  it('navigates to the next set through the ellipsis', async () => {
    const { pages, paginator, update } = await setup({ maxSize: 5 });

    await update(() => paginator.setCurrentPage(paginator.pages.at(-1)!.number));

    expect(pages()).toEqual(['...', '6*', '7', '8', '9', '10']);
  });
});

describe('AngularPaginatorDirective rotate', () => {
  it('keeps the current page in the middle', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, currentPage: 5 });

    expect(pages()).toEqual(['3', '4', '5*', '6', '7']);
  });

  it('clamps the range at the start', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, currentPage: 2 });

    expect(pages()).toEqual(['1', '2*', '3', '4', '5']);
  });

  it('clamps the range at the end', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, currentPage: 10 });

    expect(pages()).toEqual(['6', '7', '8', '9', '10*']);
  });

  it('shows ellipses with forceEllipses', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, forceEllipses: true, currentPage: 5 });

    expect(pages()).toEqual(['...', '3', '4', '5*', '6', '7', '...']);
  });

  it('shows only the trailing ellipsis with forceEllipses on the first page', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, forceEllipses: true });

    expect(pages()).toEqual(['1*', '2', '3', '4', '5', '...']);
  });
});

describe('AngularPaginatorDirective boundaryLinkNumbers', () => {
  it('shows the last page number on the first page', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, boundaryLinkNumbers: true });

    expect(pages()).toEqual(['1*', '2', '3', '4', '5', '...', '10']);
  });

  it('replaces the leading ellipsis with the second page when sequential', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, boundaryLinkNumbers: true, currentPage: 5 });

    expect(pages()).toEqual(['1', '2', '3', '4', '5*', '6', '7', '...', '10']);
  });

  it('replaces the trailing ellipsis with the second to last page when sequential', async () => {
    const { pages } = await setup({ maxSize: 5, rotate: true, boundaryLinkNumbers: true, currentPage: 6 });

    expect(pages()).toEqual(['1', '...', '4', '5', '6*', '7', '8', '9', '10']);
  });

  it('shows both boundaries in the middle', async () => {
    const { pages } = await setup({
      items: range(200),
      maxSize: 5,
      rotate: true,
      boundaryLinkNumbers: true,
      currentPage: 10,
    });

    expect(pages()).toEqual(['1', '...', '8', '9', '10*', '11', '12', '...', '20']);
  });

  it('works without rotate', async () => {
    const { pages } = await setup({ maxSize: 5, boundaryLinkNumbers: true, currentPage: 7 });

    expect(pages()).toEqual(['1', '...', '6', '7*', '8', '9', '10']);
  });
});

describe('AngularPaginatorDirective navigation', () => {
  it('navigates to the next and previous pages', async () => {
    const { pages, items, host, paginator, update } = await setup();

    await update(() => paginator.toNextPage());

    expect(host.emitted).toEqual([2]);
    expect(pages()[1]).toBe('2*');
    expect(items()).toEqual(range(10).map((i) => i + 10));

    await update(() => paginator.toPreviousPage());

    expect(host.emitted).toEqual([2, 1]);
    expect(pages()[0]).toBe('1*');
  });

  it('navigates to the first and last pages', async () => {
    const { pages, host, paginator, update } = await setup({ currentPage: 4 });

    await update(() => paginator.toLastPage());

    expect(host.emitted).toEqual([10]);
    expect(pages().at(-1)).toBe('10*');

    await update(() => paginator.toFirstPage());

    expect(host.emitted).toEqual([10, 1]);
    expect(pages()[0]).toBe('1*');
  });

  it('sets the given page', async () => {
    const { pages, host, paginator, update } = await setup();

    await update(() => paginator.setCurrentPage(7));

    expect(host.emitted).toEqual([7]);
    expect(pages()[6]).toBe('7*');
  });

  it('does not emit when setting the current page', async () => {
    const { host, paginator, update } = await setup({ currentPage: 3 });

    await update(() => paginator.setCurrentPage(3));

    expect(host.emitted).toEqual([]);
  });

  it('does not navigate past the first page', async () => {
    const { host, paginator, update } = await setup();

    await update(() => paginator.toPreviousPage());
    await update(() => paginator.toFirstPage());

    expect(host.emitted).toEqual([]);
  });

  it('does not navigate past the last page', async () => {
    const { host, paginator, update } = await setup({ currentPage: 10 });

    await update(() => paginator.toNextPage());
    await update(() => paginator.toLastPage());

    expect(host.emitted).toEqual([]);
  });

  it('emits when the page is changed through the pipe', async () => {
    const { pages, host, update } = await setup();

    await update(() => host.currentPage.set(3));

    expect(host.emitted).toEqual([3]);
    expect(pages()[2]).toBe('3*');
  });
});

describe('AngularPaginatorDirective out of range correction', () => {
  it('corrects the page when the list shrinks', async () => {
    const { pages, items, host, update } = await setup({ currentPage: 10 });

    await update(() => host.items.set(range(25)));

    expect(host.emitted).toEqual([3]);
    expect(pages()).toEqual(['1', '2', '3*']);
    expect(items()).toEqual([21, 22, 23, 24, 25]);
  });

  it('corrects a page beyond the last page when already on the last page', async () => {
    const { pages, items, host, update } = await setup({ items: range(30), currentPage: 3 });

    await update(() => host.currentPage.set(10));

    expect(host.emitted).toEqual([3]);
    expect(host.currentPage()).toBe(3);
    expect(pages()).toEqual(['1', '2', '3*']);
    expect(items()).toEqual(range(10).map((i) => i + 20));
  });

  it('marks the corrected page active on initialization', async () => {
    const fixture = createHost({ items: range(30), currentPage: 10 });
    fixture.detectChanges();

    expect(fixture.componentInstance.paginator().pages.map((page) => page.active)).toEqual([false, false, true]);

    await settle(fixture);

    expect(fixture.componentInstance.emitted).toEqual([3]);
    expect(fixture.componentInstance.currentPage()).toBe(3);
  });

  it('corrects a page below the first page', async () => {
    const { pages, host, update } = await setup();

    await update(() => host.currentPage.set(-2));

    expect(host.emitted).toEqual([1]);
    expect(pages()[0]).toBe('1*');
  });
});
