import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  router.get('/', controller.home.index);

  router.get('/juhe/exchange/query', middleware.juheCache(app), controller.juhe.getExchangeQuery);
  router.get('/juhe/exchange/list', middleware.juheCache(app), controller.juhe.getExchangeList);
  router.get('/juhe/exchange/currency', middleware.juheCache(app), controller.juhe.getExchangeCurrency);

  const ccxtMiddleware = [ middleware.ccxt(app), middleware.ccxtCache(app) ];

  router.get('/ccxt/exchanges', controller.ccxt.exchanges);

  router.get('/ccxt/:exchangeId', ...ccxtMiddleware, controller.ccxt.exchange);

  router.get('/ccxt/:exchangeId/time', ...ccxtMiddleware, controller.ccxt.fetchTime);
  router.get('/ccxt/:exchangeId/status', ...ccxtMiddleware, controller.ccxt.fetchStatus);

  router.get('/ccxt/:exchangeId/market/:symbol', ...ccxtMiddleware, controller.ccxt.fetchMarket);
  router.get('/ccxt/:exchangeId/markets', ...ccxtMiddleware, controller.ccxt.fetchMarkets);
  router.get('/ccxt/:exchangeId/market_id/:symbol', ...ccxtMiddleware, controller.ccxt.fetchMarketId);
  router.get('/ccxt/:exchangeId/market_ids', ...ccxtMiddleware, controller.ccxt.fetchMarketIds);

  router.get('/ccxt/:exchangeId/symbol/:symbol', ...ccxtMiddleware, controller.ccxt.fetchSymbol);
  router.get('/ccxt/:exchangeId/symbols', ...ccxtMiddleware, controller.ccxt.fetchSymbols);

  router.get('/ccxt/:exchangeId/currencies', ...ccxtMiddleware, controller.ccxt.fetchCurrencies);

  router.get('/ccxt/:exchangeId/ids', ...ccxtMiddleware, controller.ccxt.fetchIds);

  router.get('/ccxt/:exchangeId/orderbook/:symbol', ...ccxtMiddleware, controller.ccxt.fetchOrderBook);
  router.get('/ccxt/:exchangeId/depth/:symbol', ...ccxtMiddleware, controller.ccxt.fetchDepth);
  router.get('/ccxt/:exchangeId/price/:symbol', ...ccxtMiddleware, controller.ccxt.fetchPrice);

  router.get('/ccxt/:exchangeId/ohlcv/:symbol', ...ccxtMiddleware, controller.ccxt.fetchOHLCV);

  router.get('/ccxt/:exchangeId/trades/:symbol', ...ccxtMiddleware, controller.ccxt.fetchTrades);

  router.get('/ccxt/:exchangeId/ticker/:symbol', ...ccxtMiddleware, controller.ccxt.fetchTicker);
  router.get('/ccxt/:exchangeId/tickers', ...ccxtMiddleware, controller.ccxt.fetchTickers);

  router.get('/v1/account/accounts', controller.account.accounts);

  router.get('account_balance', '/v1/account/accounts/:id/balance', controller.account.balance);

  router.get('ws', '/v1/ws/account/sign', controller.account.signWs);

  // const localStrategy = app.passport.authenticate('local');
  // router.post('/passport/local', localStrategy);

  // router.get('/logout', controller.account.logout);

  // router.get('/auth/login', controller.account.login);
};
