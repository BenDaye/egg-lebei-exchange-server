'use strict';

const Service = require('egg').Service;

class JuheService extends Service {
  async getExchangeQuery() {
    const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/query?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
    if (error_code) throw new Error(reason);
    return result.list;
  }

  async getExchangeList() {
    const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/list?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
    if (error_code) throw new Error(reason);
    return result.list;
  }

  async getExchangeCurrency(from, to) {
    const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/currency?key=${process.env.JU_HE_EXCHANGE_API_KEY}&from=${from}&to=${to}`);
    if (error_code) throw new Error(reason);
    return result;
  }
}

module.exports = JuheService;
