'use strict';

const Controller = require('egg').Controller;

class JuheController extends Controller {
  async handleSuccess(data) {
    const needQuery = [ '/juhe/exchange/currency' ].some(v => this.ctx.URL.pathname.includes(v));
    const key = needQuery ? this.ctx.url.toLowerCase() : this.ctx.URL.pathname.toLowerCase();
    this.app.lruCache.get('juhe').set(key, data);
    this.ctx.onSuccess(data);
    return;
  }

  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  }

  async getExchangeQuery() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = async () => await this.service.juhe.getExchangeQuery();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeList() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = async () => await this.service.juhe.getExchangeList();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
  async getExchangeCurrency() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = async () => await this.service.juhe.getExchangeCurrency();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = JuheController;
