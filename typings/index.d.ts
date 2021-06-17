import 'egg'
import mongoose = require('mongoose')
import LRUCache = require('lru-cache')
import passportLocal = require('passport-local')
import ccxt = require('ccxt')
import SocksProxyAgent = require('socks-proxy-agent')
import HttpsProxyAgent = require('https-proxy-agent')

declare module 'egg' {
  interface AuthenticationResult {
    user: any
    error: any
  }
  interface AuthenticateMethod<T> {
    (username: string, password: string): Promise<AuthenticationResult>
    (
      username: string,
      password: string,
      cb: (err: any, user: T | boolean, error: any) => void
    ): void
  }
  interface PassportLocalModel<T extends mongoose.Document>
    extends mongoose.Model<T> {
    authenticate(): AuthenticateMethod<T>
    serializeUser(): (
      user: PassportLocalModel<T>,
      cb: (err: any, id?: any) => void
    ) => void
    deserializeUser(): (
      username: string,
      cb: (err: any, user?: any) => void
    ) => void

    register(user: T, password: string): Promise<T>
    register(
      user: T,
      password: string,
      cb: (err: any, account: any) => void
    ): void
    findByUsername(
      username: string,
      selectHashSaltFields: boolean
    ): mongoose.Query<T>
    findByUsername(
      username: string,
      selectHashSaltFields: boolean,
      cb: (err: any, account: any) => void
    ): any
    createStrategy(): passportLocal.Strategy
  }

  type MongooseModels = {
    [key: string]: mongoose.Model<T>
    Account: PassportLocalModel<T>
  }

  type LRUCacheSingleton<K, V> = {
    clients: Map<String, LRUCache<K, V>>
    get(id: string): LRUCache<K, V>
  }
  interface EggAppConfig {
    mongoose: {
      url?: string
      options?: mongoose.ConnectionOptions
      client?: mongoose.MongooseConfig
      clients?: {
        [key: string]: mongoose.MongooseConfig
      }
      plugins?: any[]
      loadModel?: boolean
    }
  }
  interface Application {
    httpsProxyAgent: HttpsProxyAgent
    socksProxyAgent: SocksProxyAgent
    ccxt: Record<string, ccxt.Exchange>
    setCcxt: Function
    ccxtCache: LRUCache<string, any>
    juheCache: LRUCache<string, any>
    coinMarketCapCache: LRUCache<string, any>
    mongoose: typeof mongoose
    model: MongooseModels
  }

  interface Context {
    exchange: ccxt.Exchange
    model: MongooseModels
    onSuccess: Function
    onError: Function
  }
}
