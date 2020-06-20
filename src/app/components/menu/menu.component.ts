import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  @Output() closeMenu = new EventEmitter();

  isMenuVisible = false;
  formType: 'signin' | 'signup' | '' = '';

  constructor(public authService: AuthService) {}

  showAuth(formType: 'signin' | 'signup' | '' = ''): void {
    this.formType = formType;
  };
}
