import { Application, Context } from 'egg';
import ccxt = require('ccxt');

export default function ccxtMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {

    try {
      const exchangeId: ccxt.ExchangeId = ctx.params.exchangeId;
      if (!exchangeId) {
        ctx.body = {
          status: 0,
          message: `Error: ${exchangeId} is required`,
        };
        return;
      }
      if (!app.ccxt[exchangeId]) {
        // if (!ccxt.exchanges.includes(exchangeId)) ctx.throw(500, `${exchangeId} is not a valid exchangeId`);
        if (!ccxt.exchanges.includes(exchangeId)) {

          ctx.body = {
            status: 0,
            message: `Error: ${exchangeId} is not a valid exchangeId`,
          };
          return;
        }
        const exchange: ccxt.Exchange = new ccxt[exchangeId]({ agent: app.httpsProxyAgent });
        await exchange.loadMarkets();
        app.setCcxt({ ...(app.ccxt || {}), [exchangeId]: exchange });
      }

      await app.ccxt[exchangeId].loadMarkets();
      ctx.exchange = app.ccxt[exchangeId];
    } catch (err) {
      ctx.body = {
        status: 0,
        message: `Error: ${err.message}`,
      };
      return;
    }

    await next();
  };
}
