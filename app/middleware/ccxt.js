'use strict';

const ccxt = require('ccxt');

module.exports = (options, app) => {
  return async function ccxtMiddleware(ctx, next) {
    try {
      const exchangeId = ctx.params.exchangeId;

      if (!exchangeId) throw new ccxt.NotSupported(`${exchangeId} is required`);
      if (!ccxt.exchanges.includes(exchangeId)) throw new ccxt.NotSupported(`${exchangeId} is not a valid exchangeId`);

      ctx.exchange = await app.cacheManager
        .get('memory')
        .wrap(`ccxt_${exchangeId}`, () => {
          return new Promise(async (resolve, reject) => {
            try {
              const _exchange = new ccxt[exchangeId]({
                agent:
                  app.config.env === 'prod' ? undefined : app.httpsProxyAgent,
                enableRateLimit: true,
              });
              await _exchange.loadMarkets();
              resolve(_exchange);
            } catch (err) {
              reject(err);
            }
          });
        });

      await next();
    } catch (err) {
      return ctx.onError(err);
    }
  };
};
