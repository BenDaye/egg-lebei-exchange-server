'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async accounts() {
    const { AccessKeyId, SecretKey } = this.ctx.query;
    const { data } = await this.ctx.service.http.account.accounts({
      AccessKeyId,
      SecretKey,
    });
    this.ctx.body = data;
  }

  async balance() {
    const { AccessKeyId, SecretKey } = this.ctx.query;
    const { id } = this.ctx.params;
    const { data } = await this.ctx.service.http.account.balance({
      AccessKeyId,
      SecretKey,
      id,
    });
    this.ctx.body = data;
  }

  async signWs() {
    const { accessKey, secretKey } = this.ctx.query;
    this.ctx.body = await this.ctx.service.ws.account.sign({
      accessKey,
      secretKey,
    });
  }
}

module.exports = AccountController;
