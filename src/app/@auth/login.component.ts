import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: '',
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) {
    // Parse authentication hash
  }

  ngOnInit() {
    this.auth.login();
  }
}
