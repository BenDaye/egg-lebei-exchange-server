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
      if (!app.ccxt[exchangeId]) {
        if (!ccxt.exchanges.includes(exchangeId)) {
          ctx.onError(new ccxt.NotSupported(`${exchangeId} is not a valid exchangeId`));
          return;
        }
        const exchange = new ccxt[exchangeId]({ agent: app.config.env === 'prod' ? undefined : app.httpsProxyAgent, enableRateLimit: true });
        await exchange.loadMarkets();
        app.setCcxt({ ...(app.ccxt || {}), [exchangeId]: exchange });
      }

      await app.ccxt[exchangeId].loadMarkets();
      ctx.exchange = app.ccxt[exchangeId];
    } catch (err) {
      return ctx.onError(err);
    }

    await next();
  };
};
