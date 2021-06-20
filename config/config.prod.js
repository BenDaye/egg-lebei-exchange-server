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
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
  });

  const userConfig = {
    mongoose: {
      url: process.env.MONGOOSE_URL,
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
      secret: process.env.PASSPORT_JWT_SECRET,
    },
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
