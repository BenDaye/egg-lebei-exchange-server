// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount = require('../../../app/model/account');

declare module 'egg' {
  interface IModel {
    Account: ReturnType<typeof ExportAccount>;
  }
}
