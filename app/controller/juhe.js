'use strict';

const Controller = require('egg').Controller;

class JuheController extends Controller {
  async handleSuccess(data) {
    const needQuery = [ '/juhe/exchange/currency' ].some(v => this.ctx.URL.pathname.includes(v));
    const key = needQuery ? this.ctx.url.toLowerCase() : this.ctx.URL.pathname.toLowerCase();
    this.app.juheCache.set(key, data);
    this.ctx.onSuccess(data);
    return;
  }

  async getExchangeQuery() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/query?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code)
        this.ctx.onError(new Error(reason));
      else
        this.handleSuccess(result.list);

    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeList() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/list?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code)
        this.ctx.onError(new Error(reason));
      else
        this.handleSuccess(result.list);

    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeCurrency() {
    try {
      const { from, to } = this.ctx.query;
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/currency?key=${process.env.JU_HE_EXCHANGE_API_KEY}&from=${from}&to=${to}`);
      if (error_code)
        this.ctx.onError(new Error(reason));
      else
        this.handleSuccess(result);

    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = JuheController;
