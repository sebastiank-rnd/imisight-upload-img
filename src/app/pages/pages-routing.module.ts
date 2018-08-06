import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent}  from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ImageDataUploadComponent } from './image-data-upload/image-data-upload.component';

import { AuthGuard } from './../@auth/auth.guard';

const routes : Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'upload',
        component: ImageDataUploadComponent,
        canActivate: [
          AuthGuard
        ],
      }, {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
       {
        path: '**',
        component: NotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
