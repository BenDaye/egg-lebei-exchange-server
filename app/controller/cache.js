'use strict';

const Controller = require('egg').Controller;

class CacheController extends Controller {
  async index() {
    this.ctx.onSuccess({
      ccxt: this.app.lruCache.get('ccxt').dump(),
      juhe: this.app.lruCache.get('juhe').dump(),
      cmc: this.app.lruCache.get('cmc').dump(),
    });
  }

  async show() {
    switch (this.ctx.params.id) {
      case 'ccxt':
        this.ctx.onSuccess(this.app.lruCache.get('ccxt').dump());
        break;
      case 'juhe':
        this.ctx.onSuccess(this.app.lruCache.get('ccxt').dump());
        break;
      case 'cmc':
        this.ctx.onSuccess(this.app.lruCache.get('cmc').dump());
        break;
      default:
        this.ctx.onError(`Error: ${this.ctx.params.id} is not a valid cacheId`);
        break;
    }
  }

  async destroy() {
    switch (this.ctx.params.id) {
      case 'ccxt':
        this.ctx.onSuccess(this.app.lruCache.get('ccxt').reset());
        break;
      case 'juhe':
        this.ctx.onSuccess(this.app.lruCache.get('juhe').reset());
        break;
      case 'cmc':
        this.ctx.onSuccess(this.app.lruCache.get('cmc').reset());
        break;
      default:
        this.ctx.onError(`Error: ${this.ctx.params.id} is not a valid cacheId`);
        break;
    }
  }
}

module.exports = CacheController;
