import { Exchange } from 'ccxt';
import 'egg';
import * as mongoose from 'mongoose';
import LRU = require('lru-cache');

declare module 'egg' {
  interface BaseParams {
    AccessKeyId: string
    SecretKey: string
  }
  interface EggAppConfig {
    mongoose: {
      url?: string,
      options?: mongoose.ConnectionOptions,
      client?: mongoose.MongooseConfig,
      clients?: {
        [key: string]: mongoose.MongooseConfig
      }
      plugins?: any[]
      loadModel?: boolean
    };
  }
  interface Application {
    httpsProxyAgent: HttpsProxyAgent
    socksProxyAgent: SocksProxyAgent
    ccxt: Record<string, Exchange>
    setCcxt: Function
    ccxtCache: LRU<string, any>
    mongoose: mongoose.Mongoose
  }

  interface Context {
    exchange: Exchange
  }
}
