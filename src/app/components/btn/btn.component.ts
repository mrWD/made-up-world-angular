import {
  Component,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.sass'],
})
export class BtnComponent {
  @Input() isSmall: boolean = false;
  @Input() isError: boolean = false;
  @Input() isText: boolean = false;
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter();

  handleClick(e: Event) {
    e.stopPropagation();

    this.click.emit();
  }
}
