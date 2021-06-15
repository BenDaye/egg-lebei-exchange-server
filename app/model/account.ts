import { Application } from 'egg';
import passportLocalMongoose = require('passport-local-mongoose');

module.exports = (app: Application) => {
  const mongoose = app.mongoose;
  const AccountSchema = new mongoose.Schema({});

  AccountSchema.plugin(passportLocalMongoose);

  return mongoose.model('Account', AccountSchema);
};
