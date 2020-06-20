import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Card {
  isFirst: boolean;
  id: string;
  body: string;
  nextPages: string[];
  options: string[];
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() changedCard: string;
  @Input() card: Card;

  @Output() setPin = new EventEmitter();
  @Output() setFirst = new EventEmitter();
  @Output() removePage = new EventEmitter();
  @Output() showPins = new EventEmitter();
  @Output() changePin = new EventEmitter();

  addBackground(value: string): { backgroundColor: string } {
    const color = value
      .substring(value.length - 6)
      .split('')
      .reverse()
      .join('');

    return {
      backgroundColor: `#${color}`,
    };
  }

  getPageLink(value: string): string {
    return `/edit-page/${value}`;
  }
}
