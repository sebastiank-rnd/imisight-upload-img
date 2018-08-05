import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { ThemeModule } from '../@theme/theme.module';

import { AuthService } from './auth.service';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { TokenInterceptor } from './token-interceptor';



const SERVICES = [
  AuthService,
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ...SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
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
