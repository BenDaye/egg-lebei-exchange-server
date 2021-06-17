import { Application, Context } from 'egg';
import ccxt = require('ccxt');

export default function ccxtMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {

    try {
      const exchangeId: ccxt.ExchangeId = ctx.params.exchangeId;
      if (!exchangeId) {
        ctx.onError(new ccxt.NotSupported(`${exchangeId} is required`));
        return;
      }
      if (!app.ccxt[exchangeId]) {
        if (!ccxt.exchanges.includes(exchangeId)) {

          ctx.onError(new ccxt.NotSupported(`${exchangeId} is not a valid exchangeId`));
          return;
        }
        const exchange: ccxt.Exchange = new ccxt[exchangeId]({ agent: app.config.env === 'prod' ? undefined : app.httpsProxyAgent, enableRateLimit: true });
        await exchange.loadMarkets();
        app.setCcxt({ ...(app.ccxt || {}), [exchangeId]: exchange });
      }

      await app.ccxt[exchangeId].loadMarkets();
      ctx.exchange = app.ccxt[exchangeId];
    } catch (err) {
      ctx.onError(err);
      return;
    }

    await next();
  };
}
