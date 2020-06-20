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
  @Input() isSmall = false;
  @Input() isError = false;
  @Input() isText = false;
  @Input() disabled = false;

  @Output() click = new EventEmitter();

  handleClick(e: Event) {
    e.stopPropagation();

    this.click.emit();
  }
}
