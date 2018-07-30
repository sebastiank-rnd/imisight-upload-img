
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { CallbackComponent } from './callback/callback.component';



const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'logout',
    component: LogoutComponent,
  }, {
    path: 'callback',
    component: CallbackComponent,
  },],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthRoutingModule {

}

export const routedComponents = [
  AuthComponent,
  LoginComponent,
  LogoutComponent,
  CallbackComponent,
];
