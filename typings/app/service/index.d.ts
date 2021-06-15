// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
import ExportTest from '../../../app/service/Test';
import ExportHttpAccount from '../../../app/service/http/Account';
import ExportWsAccount from '../../../app/service/ws/Account';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    test: AutoInstanceType<typeof ExportTest>;
    http: {
      account: AutoInstanceType<typeof ExportHttpAccount>;
    }
    ws: {
      account: AutoInstanceType<typeof ExportWsAccount>;
    }
  }
}
