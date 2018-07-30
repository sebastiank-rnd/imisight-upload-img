import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';


const SERVICES = [
  AuthService,
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
