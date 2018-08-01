import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS : NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true
  }, {
    title: 'Upload',
    icon: 'nb-home',
    link: '/pages/upload',
    home: true
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login'
      },
      {
        title: 'Logout',
        link: '/auth/logout'
      },
    ]
  },
];
