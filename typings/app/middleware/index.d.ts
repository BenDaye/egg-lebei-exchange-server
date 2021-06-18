// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCcxt = require('../../../app/middleware/ccxt');
import ExportCacheCcxt = require('../../../app/middleware/cache/ccxt');
import ExportCacheCmc = require('../../../app/middleware/cache/cmc');
import ExportCacheJuhe = require('../../../app/middleware/cache/juhe');

declare module 'egg' {
  interface IMiddleware {
    ccxt: typeof ExportCcxt;
    cache: {
      ccxt: typeof ExportCacheCcxt;
      cmc: typeof ExportCacheCmc;
      juhe: typeof ExportCacheJuhe;
    }
  }
}
