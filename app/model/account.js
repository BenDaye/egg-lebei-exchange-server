'use strict';

const passportLocalMongoose = require('passport-local-mongoose');

module.exports = app => {
  const mongoose = app.mongoose;
  const AccountSchema = new mongoose.Schema({});

  AccountSchema.plugin(passportLocalMongoose);

  return mongoose.model('Account', AccountSchema);
};
