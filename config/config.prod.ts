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
  };
  return config;
};
