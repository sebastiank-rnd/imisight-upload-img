import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../@theme/theme.module';

import { AuthService } from './auth.service';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';


const SERVICES = [
  AuthService,
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
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
