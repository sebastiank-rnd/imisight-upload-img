import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS : NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
    home: true
  }, {
    title: 'Upload',
    icon: 'nb-home',
    link: '/upload',
    home: true
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/login'
      },
      {
        title: 'Logout',
        link: '/logout'
      },
    ]
  },
];

