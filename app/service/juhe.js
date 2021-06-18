'use strict';

const Service = require('egg').Service;

class JuheService extends Service {
  async getExchangeQuery() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/query?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) throw new Error(reason);
      return result.list;
    } catch (err) {
      throw err;
    }
  }

  async getExchangeList() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/list?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) throw new Error(reason);
      return result.list;
    } catch (err) {
      throw err;
    }
  }

  async getExchangeCurrency() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/currency?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) throw new Error(reason);
      return result.list;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = JuheService;
