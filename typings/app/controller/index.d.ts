// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportCcxt from '../../../app/controller/ccxt';
import ExportCmc from '../../../app/controller/cmc';
import ExportHome from '../../../app/controller/home';
import ExportJuhe from '../../../app/controller/juhe';
import ExportPassport from '../../../app/controller/passport';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    ccxt: ExportCcxt;
    cmc: ExportCmc;
    home: ExportHome;
    juhe: ExportJuhe;
    passport: ExportPassport;
  }
}
