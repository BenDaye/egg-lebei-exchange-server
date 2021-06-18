/* eslint valid-jsdoc: "off" */

'use strict';

const mongooseAutopopulate = require('mongoose-autopopulate');
const mongooseHidden = require('mongoose-hidden')({
  hidden: { _id: true, __v: true },
});

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    httpclient: {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: 'http://127.0.0.1:7890',
      },
    },
  });

  const userConfig = {
    mongoose: {
      url: 'mongodb://lebei:lebei123698745@127.0.0.1:27017/lebei',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      plugins: [ mongooseAutopopulate, mongooseHidden ],
      loadModel: true,
    },
    passportJwt: {
      secret: 'local',
    },
    huobiHost: process.env.HUOBI_HOST || 'api.huobi.pro',
    huobiHttpBaseUrl:
      process.env.HUOBI_HTTP_BASE_URL || 'https://api.huobi.pro',
    huobiWsBaseUrl: process.env.HUOBI_WS_BASE_URL || 'wss://api.huobi.pro/ws',
    lruCache: {
      clients: {
        ccxt: {
          maxAge: 1000 * 2,
        },
        cmc: {},
        juhe: {},
      },
      default: {
        max: 500,
        maxAge: 1000 * 60 * 60,
      },
      app: true,
    },
    cacheManager: {
      clients: {
        mongooseCcxt: {
          store: 'mongoose',
          options: {
            modelName: 'CacheCcxt',
            modelOptions: {
              collection: 'cache_ccxt',
            },
          },
          ttl: 2,
          auth: 'cache:cache123698745',
        },
        redisCcxt: {
          store: 'redis',
          db: 0,
          port: 6379,
          ttl: 2,
        },
        mongooseCMC: {
          store: 'mongoose',
          options: {
            modelName: 'CacheCMC',
            modelOptions: {
              collection: 'cache_cmc',
            },
          },
          auth: 'cache:cache123698745',
        },
        mongooseJuhe: {
          store: 'mongoose',
          options: {
            modelName: 'CacheJuhe',
            modelOptions: {
              collection: 'cache_juhe',
            },
          },
          auth: 'cache:cache123698745',
        },
        memory: {
          store: 'memory',
        },
      },
      default: {
        ttl: 60 * 60,
        max: 500,
        db: 'lebei',
        host: 'localhost',
        port: 27017,
      },
      app: true,
    },
  };

  return { ...config, ...userConfig };
};
