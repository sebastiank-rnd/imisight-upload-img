import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'ngx-auth',
  template: `<router-outlet></router-outlet>`,
})
export class AuthComponent {

  constructor(public auth : AuthService) {
    // Parse authentication hash
  }
}
