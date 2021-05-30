// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthenticated from '../../../app/middleware/authenticated';
import ExportCcxt from '../../../app/middleware/ccxt';
import ExportCcxtCache from '../../../app/middleware/ccxt_cache';
import ExportJuheCache from '../../../app/middleware/juhe_cache';

declare module 'egg' {
  interface IMiddleware {
    authenticated: typeof ExportAuthenticated;
    ccxt: typeof ExportCcxt;
    ccxtCache: typeof ExportCcxtCache;
    juheCache: typeof ExportJuheCache;
  }
}
