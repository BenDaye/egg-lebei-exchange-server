import { EggAppConfig, PowerPartial } from 'egg';

import mongooseAutopopulate = require('mongoose-autopopulate');
import MongooseHidden = require('mongoose-hidden');

const mongooseHidden = MongooseHidden({
  hidden: {
    _id: true,
    __v: true,
  },
});

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    httpclient: {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: 'http://127.0.0.1:7890',
      },
    },
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
  };

  config.huobiHost = process.env.HUOBI_HOST || 'api.huobi.pro';
  config.huobiHttpBaseUrl =
    process.env.HUOBI_HTTP_BASE_URL || 'https://api.huobi.pro';
  config.huobiWsBaseUrl =
    process.env.HUOBI_WS_BASE_URL || 'wss://api.huobi.pro/ws';

  return config;
};
