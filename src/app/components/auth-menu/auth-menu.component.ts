import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StoriesService } from 'src/app/shared/stories.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.sass'],
})
export class AuthMenuComponent {
  @Input() login: string;
  @Output() click = new EventEmitter();
  @Output() signOut = new EventEmitter();

  constructor(public storiesService: StoriesService, public router: Router) {}

  getUserPage(): string {
    return `/user/${this.login}`;
  }

  createNewStory() {
    this.storiesService.clearList();

    this.click.emit();

    this.router.navigate(['edit-page']);
  }

  handleSignOut() {
    this.signOut.emit();
  }
}
