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
  };

  return { ...config, ...userConfig };
};
