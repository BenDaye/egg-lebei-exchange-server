'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class AuthService extends Service {
  async register(username, password) {
    return await this.app.model.Account.register(
      new this.app.model.Account({
        username,
      }), password
    );
  }

  async login(username, password) {
    const { user, error } = await this.app.model.Account.authenticate()(username, password);
    if (error) throw error;

    return jwt.sign(user.username, this.app.config.passportJwt.secret);
  }
}

module.exports = AuthService;
