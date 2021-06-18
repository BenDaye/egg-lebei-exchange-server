'use strict';

const Controller = require('egg').Controller;

class CmcController extends Controller {
  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  }

  async cryptoCurrencyListingsLatest() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = async () => await this.service.cmc.cryptoCurrencyListingsLatest(this.ctx.query);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async cryptoCurrencyMetadata() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = async () => await this.service.cmc.cryptoCurrencyMetadata(this.ctx.query);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async keyInfo() {
    try {
      const cacheKey = this.getCacheKey(false);
      const getDataFunction = async () => await this.service.cmc.keyInfo();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = CmcController;
