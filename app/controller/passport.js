'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
  async logout() {
    this.ctx.logout();
    this.ctx.onSuccess(null);
  }

  async profile() {
    try {
      this.ctx.onSuccess(this.ctx.user);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async register() {
    try {
      const { username, password } = this.ctx.request.body;
      await this.ctx.service.auth.register(username, password);
      this.ctx.onSuccess(null);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async login() {
    try {
      const { username, password } = this.ctx.request.body;
      this.ctx.onSuccess(await this.ctx.service.auth.login(username, password));
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = PassportController;
