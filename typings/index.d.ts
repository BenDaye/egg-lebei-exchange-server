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
      client?: MongooseConfig,
      clients?: {
        [key: string]: MongooseConfig
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
  }

  interface Context {
    exchange: Exchange
  }
}
