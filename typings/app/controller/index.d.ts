// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount = require('../../../app/controller/account');
import ExportCache = require('../../../app/controller/cache');
import ExportCcxt = require('../../../app/controller/ccxt');
import ExportCmc = require('../../../app/controller/cmc');
import ExportHome = require('../../../app/controller/home');
import ExportJuhe = require('../../../app/controller/juhe');
import ExportPassport = require('../../../app/controller/passport');
import ExportTest = require('../../../app/controller/test');

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    cache: ExportCache;
    ccxt: ExportCcxt;
    cmc: ExportCmc;
    home: ExportHome;
    juhe: ExportJuhe;
    passport: ExportPassport;
    test: ExportTest;
  }
}
