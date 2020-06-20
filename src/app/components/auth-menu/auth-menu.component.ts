import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.sass'],
})
export class AuthMenuComponent {
  @Input() login: string;
  @Output() click = new EventEmitter();
  @Output() signOut = new EventEmitter();

  getUserPage(): string {
    return `/user/${this.login}`;
  }

  handleSignOut() {
    this.signOut.emit();
  }
}
