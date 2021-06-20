'use strict';

const Controller = require('egg').Controller;

class JuheController extends Controller {
  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  }

  async getExchangeQuery() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.juhe.getExchangeQuery();
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeList() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.juhe.getExchangeList();
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeCurrency() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = () => this.service.juhe.getExchangeCurrency();
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = JuheController;
