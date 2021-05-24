import { EggAppConfig, PowerPartial } from 'egg';

import mongooseAutopopulate = require('mongoose-autopopulate');
import MongooseHidden = require('mongoose-hidden');

const mongooseHidden = MongooseHidden({
  hidden: {
    _id: true, __v: true,
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
      url: 'mongodb://huobi:huobi123698745@127.0.0.1:27017',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      plugins: [ mongooseAutopopulate, mongooseHidden ],
      loadModel: true,
    },
  };
  return config;
};
