'use strict';

const Controller = require('egg').Controller;

class CmcController extends Controller {
  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  }

  async cryptoCurrencyListingsLatest() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = () => this.service.cmc.cryptoCurrencyListingsLatest(this.ctx.query);
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async cryptoCurrencyMetadata() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = () => this.service.cmc.cryptoCurrencyMetadata(this.ctx.query);
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async keyInfo() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = () => this.service.cmc.keyInfo();
      const res = await this.service.cache.getFromCtx(cacheKey, getDataFunction);
      this.ctx.onSuccess(res);
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = CmcController;
