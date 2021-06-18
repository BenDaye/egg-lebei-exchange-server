'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async cacheManager() {
    const { ctx } = this;

    const test = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('test');
        }, 3000);
      });
    };

    try {
      const res = await ctx.service.cache.get('ccxt', 'test', test);

      ctx.onSuccess(res);
    } catch (err) {
      ctx.onError(err);
    }

  }
}

module.exports = TestController;
