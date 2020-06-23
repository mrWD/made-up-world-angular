import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthInfo();
  }
}
