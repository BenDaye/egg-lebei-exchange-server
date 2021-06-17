'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  async accounts({ AccessKeyId, SecretKey }) {
    const Url = '/v1/account/accounts';
    const signature = this.ctx.helper.sign({ Url, AccessKeyId, SecretKey });
    return await this.ctx.curl(`${this.config.huobiHttpBaseUrl}${Url}?${signature}`);
  }

  async balance({ AccessKeyId, SecretKey, id }) {
    const Url = `/v1/account/accounts/${id}/balance`;
    const signature = this.ctx.helper.sign({ Url, AccessKeyId, SecretKey });
    return await this.ctx.curl(`${this.config.huobiHttpBaseUrl}${Url}?${signature}`);
  }
}

module.exports = AccountService;
