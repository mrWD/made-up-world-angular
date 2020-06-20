import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent {
  @Input() isBtn: boolean;
  @Input() title: string;
  @Input() routeName: string;
  @Input() routeProp: string;
  @Input() propName: string;
  @Input() list: object[];

  @ContentChild('lineContent') lineContentTmpl: TemplateRef<any>;

  LENGTH_LIMIT = 5;
  maxLength = this.LENGTH_LIMIT;

  getLink(value: string): string {
    return `/${this.routeName}/${value}`;
  }

  toggleLimit() {
    this.maxLength = this.maxLength > this.LENGTH_LIMIT ? this.LENGTH_LIMIT : this.list.length;
  }
}
