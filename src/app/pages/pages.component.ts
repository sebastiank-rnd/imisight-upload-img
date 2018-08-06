import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from './../@auth/auth.service';
import { NbMenuItem } from '../../../node_modules/@nebular/theme';
import { filter, switchMap, race, startWith, map } from 'rxjs/operators';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu$ | async"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;
  menu = MENU_ITEMS;
  menu$ : Observable<NbMenuItem[]>

  constructor(private _auth : AuthService) {
  }

  ngOnInit() {

    const loggedin$ = this._auth.loggedIn$.pipe(
      filter(loggedIn => loggedIn),
      map(() => MENU_ITEMS
        .map<NbMenuItem>(item => {
          if (item.title==='Auth') {
            return {
              ... item,
              children: item.children.filter(child => child.title==='Logout'),
            };
          }

          return item;
        })
      )
    );

   const loggedOut$ = this._auth.loggedIn$.pipe(
      filter(loggedIn => !loggedIn),
      map(() => MENU_ITEMS
        .filter(item => item.title!=='Upload')
        .map<NbMenuItem>(item => {
          if (item.title==='Auth') {
            return {
              ... item,
              children: item.children.filter(child => child.title==='Login'),
            };
          }

          return item;
        })
      )
    );

    this.menu$ = loggedin$.pipe(race(loggedOut$), startWith(MENU_ITEMS));
  }

  ngOnDestroy() {
  }
}
