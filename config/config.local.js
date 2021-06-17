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
  };

  return { ...config, ...userConfig };
};
