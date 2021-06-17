// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCcxt from '../../../app/middleware/ccxt';
import ExportCcxtCache from '../../../app/middleware/ccxt_cache';
import ExportCmcCache from '../../../app/middleware/cmc_cache';
import ExportJuheCache from '../../../app/middleware/juhe_cache';

declare module 'egg' {
  interface IMiddleware {
    ccxt: typeof ExportCcxt;
    ccxtCache: typeof ExportCcxtCache;
    cmcCache: typeof ExportCmcCache;
    juheCache: typeof ExportJuheCache;
  }
}
