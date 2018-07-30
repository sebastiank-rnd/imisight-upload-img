import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  template: ` <div *ngIf="auth.authenticated">Authenticated</div>
              <div *ngIf="!auth.authenticated">Not authenticated</div>`,
})
export class AuthComponent {

  constructor(public auth: AuthService) {
    // Parse authentication hash
  }
}
