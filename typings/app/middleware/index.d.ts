// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCcxt = require('../../../app/middleware/ccxt');
import ExportCcxtCache = require('../../../app/middleware/ccxt_cache');
import ExportCmcCache = require('../../../app/middleware/cmc_cache');
import ExportJuheCache = require('../../../app/middleware/juhe_cache');

declare module 'egg' {
  interface IMiddleware {
    ccxt: typeof ExportCcxt;
    ccxtCache: typeof ExportCcxtCache;
    cmcCache: typeof ExportCmcCache;
    juheCache: typeof ExportJuheCache;
  }
}
