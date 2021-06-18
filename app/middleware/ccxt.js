'use strict';

const ccxt = require('ccxt');

module.exports = (options, app) => {
  return async function ccxtMiddleware(ctx, next) {
    try {
      const exchangeId = ctx.params.exchangeId;
      if (!exchangeId) {
        ctx.onError(new ccxt.NotSupported(`${exchangeId} is required`));
        return;
      }
      if (!ccxt.exchanges.includes(exchangeId)) {
        ctx.onError(
          new ccxt.NotSupported(`${exchangeId} is not a valid exchangeId`)
        );
        return;
      }

      ctx.exchange = await app.cacheManager
        .get('memory')
        .wrap(`ccxt_${exchangeId}`, () => {
          return new Promise(async resolve => {
            const _exchange = new ccxt[exchangeId]({
              agent:
                app.config.env === 'prod' ? undefined : app.httpsProxyAgent,
              enableRateLimit: true,
            });
            await _exchange.loadMarkets();
            resolve(_exchange);
          });
        });

      await next();
    } catch (err) {
      return ctx.onError(err);
    }
  };
};
