import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from './../@auth/auth.service';
import { NbMenuItem } from '../../../node_modules/@nebular/theme';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;
  menu = MENU_ITEMS;

  constructor(public auth : AuthService) {
  }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe((loggedIn) => {
      console.log(`PagesComponent: ${!loggedIn ? 'not ': ''} logged in.`);
      this.menu = MENU_ITEMS.map<NbMenuItem>(item => {
        if (item.title==='Auth') {
          return {
            ... item,
            children: item.children.filter(child => loggedIn ? child.title==='Logout' : child.title==='Login')
          };
        }

        return item;
      })
    });
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
