import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass'],
})
export class FieldComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() rows: string | number = 1;
  @Input() type: 'text' | 'textarea' | 'date' | 'select' = 'text';
  @Input() options: Option[];

  @Output() valueChange = new EventEmitter();

  handleInput(value) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
