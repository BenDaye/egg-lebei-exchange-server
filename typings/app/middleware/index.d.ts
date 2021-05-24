// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthenticated from '../../../app/middleware/authenticated';
import ExportCache from '../../../app/middleware/cache';
import ExportCcxt from '../../../app/middleware/ccxt';

declare module 'egg' {
  interface IMiddleware {
    authenticated: typeof ExportAuthenticated;
    cache: typeof ExportCache;
    ccxt: typeof ExportCcxt;
  }
}
