import { Controller } from 'egg';

export default class CacheController extends Controller {
  public async index() {
    this.ctx.onSuccess({
      ccxt: this.app.ccxtCache.dump(),
      juhe: this.app.juheCache.dump(),
      cmc: this.app.coinMarketCapCache.dump(),
    });
  }

  public async show() {
    switch (this.ctx.params.id) {
      case 'ccxt':
        this.ctx.onSuccess(this.app.ccxtCache.dump());
        break;
      case 'juhe':
        this.ctx.onSuccess(this.app.juheCache.dump());
        break;
      case 'cmc':
        this.ctx.onSuccess(this.app.coinMarketCapCache.dump());
        break;
      default:
        this.ctx.onError(`Error: ${this.ctx.params.id} is not a valid cacheId`);
        break;
    }
  }

  public async destroy() {
    switch (this.ctx.params.id) {
      case 'ccxt':
        this.ctx.onSuccess(this.app.ccxtCache.reset());
        break;
      case 'juhe':
        this.ctx.onSuccess(this.app.juheCache.reset());
        break;
      case 'cmc':
        this.ctx.onSuccess(this.app.coinMarketCapCache.reset());
        break;
      default:
        this.ctx.onError(`Error: ${this.ctx.params.id} is not a valid cacheId`);
        break;
    }
  }
}
