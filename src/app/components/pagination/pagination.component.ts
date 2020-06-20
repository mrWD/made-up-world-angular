import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent {
  @Input() pageCount: number;
  @Input() pageNumber: number;

  @Output() click = new EventEmitter();

  private PAGE_COUNT: 4 = 4;

  getLastPage(page: number): number {
    return (Math.ceil(this.pageNumber / this.PAGE_COUNT) - 1) * this.PAGE_COUNT + page;
  }

  getPageList(): number[] {
    const pageCount = this.pageCount < this.PAGE_COUNT ? this.pageCount : this.PAGE_COUNT;

    return [...Array(pageCount).keys()];
  }
}
