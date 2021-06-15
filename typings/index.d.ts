import 'egg';

declare module 'egg' {

  import Mongoose =  require('mongoose');
  import LRU = require('lru-cache');
  import passportLocal = require('passport-local');
  import Ccxt = require('ccxt');

  interface BaseParams {
    AccessKeyId: string
    SecretKey: string
  }

  interface AuthenticationResult {
    user: any;
    error: any;
  }
  interface AuthenticateMethod<T> {
    (username: string, password: string): Promise<AuthenticationResult>;
    (username: string, password: string, cb: (err: any, user: T | boolean, error: any) => void): void;
  }
  interface PassportLocalModel<T extends Mongoose.Document> extends Mongoose.Model<T> {
    authenticate(): AuthenticateMethod<T>
    serializeUser(): (user: PassportLocalModel<T>, cb: (err: any, id?: any) => void) => void;
    deserializeUser(): (username: string, cb: (err: any, user?: any) => void) => void;

    register(user: T, password: string): Promise<T>;
    register(user: T, password: string, cb: (err: any, account: any) => void): void;
    findByUsername(username: string, selectHashSaltFields: boolean): Mongoose.Query<T>;
    findByUsername(username: string, selectHashSaltFields: boolean, cb: (err: any, account: any) => void): any;
    createStrategy(): passportLocal.Strategy;
  }

  type MongooseModels = {
    [key: string]: Mongoose.Model<T>
    Account: PassportLocalModel<T>
  };
  interface EggAppConfig {
    mongoose: {
      url?: string,
      options?: Mongoose.ConnectionOptions,
      client?: Mongoose.MongooseConfig,
      clients?: {
        [key: string]: Mongoose.MongooseConfig
      }
      plugins?: any[]
      loadModel?: boolean
    };
  }
  interface Application {
    httpsProxyAgent: HttpsProxyAgent
    socksProxyAgent: SocksProxyAgent
    ccxt: Record<string, Ccxt.Exchange>
    setCcxt: Function
    ccxtCache: LRU<string, any>
    juheCache: LRU<string, any>
    coinMarketCapCache: LRU<string, any>
    mongoose: Mongoose.Mongoose
    model: MongooseModels
  }

  interface Context {
    exchange: Ccxt.Exchange
    model: MongooseModels
  }
}
