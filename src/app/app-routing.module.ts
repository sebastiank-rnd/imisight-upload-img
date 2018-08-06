import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './@auth/callback/callback.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
  { path:'', redirectTo:'pages', pathMatch:'full'},
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'auth', loadChildren: 'app/@auth/auth.module#AuthModule' },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component:NotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing:true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
