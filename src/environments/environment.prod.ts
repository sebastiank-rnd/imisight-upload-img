/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  gatewayUrl: 'https://gw.sat.imisight.net/',
  auth0: {
    domain: 'satimisighta.auth0.com',
    clientId: 'KXLTbs08LtLqrbPwSgn7Ioej0aMB7tf6',
    audience: 'https://gw.sat.imisight.net/',
    redirect: 'http://localhost:4200/callback',
    home: 'http://localhost:4200',
    scope: 'openid profile'
  },
  info: {
    token: '334466'
  },
};
