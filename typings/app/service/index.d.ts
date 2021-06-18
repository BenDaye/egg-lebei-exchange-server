// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth = require('../../../app/service/auth');
import ExportCache = require('../../../app/service/cache');
import ExportCcxt = require('../../../app/service/ccxt');
import ExportCmc = require('../../../app/service/cmc');
import ExportJuhe = require('../../../app/service/juhe');
import ExportTest = require('../../../app/service/test');
import ExportHuobiHttpAccount = require('../../../app/service/huobi/http/account');
import ExportHuobiWsAccount = require('../../../app/service/huobi/ws/account');

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    cache: AutoInstanceType<typeof ExportCache>;
    ccxt: AutoInstanceType<typeof ExportCcxt>;
    cmc: AutoInstanceType<typeof ExportCmc>;
    juhe: AutoInstanceType<typeof ExportJuhe>;
    test: AutoInstanceType<typeof ExportTest>;
    huobi: {
      http: {
        account: AutoInstanceType<typeof ExportHuobiHttpAccount>;
      }
      ws: {
        account: AutoInstanceType<typeof ExportHuobiWsAccount>;
      }
    }
  }
}
