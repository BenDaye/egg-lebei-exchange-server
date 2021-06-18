'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router, middleware } = app;

  router.get('HOME', '/', controller.home.index);

  router.get('TEST', '/test/cache', controller.test.cacheManager);

  router.resources('CACHE', '/cache', controller.cache);

  router.get('JUHE_EXCHANGE_QUERY', '/juhe/exchange/query', middleware.cache.juhe({}, app), controller.juhe.getExchangeQuery);
  router.get('JUHE_EXCHANGE_LIST', '/juhe/exchange/list', middleware.cache.juhe({}, app), controller.juhe.getExchangeList);
  router.get('JUHE_EXCHANGE_CURRENCY', '/juhe/exchange/currency', middleware.cache.juhe({}, app), controller.juhe.getExchangeCurrency);

  const ccxtMiddleware = [
    middleware.ccxt({}, app),
    middleware.cache.ccxt({}, app),
  ];

  router.get('CCXT_EXCHANGES', '/ccxt/exchanges', controller.ccxt.exchanges);
  router.get('CCXT_VERSION', '/ccxt/version', controller.ccxt.version);

  router.get('CCXT_EXCHANGE_ID', '/ccxt/:exchangeId', ...ccxtMiddleware, controller.ccxt.exchange);

  router.get('CCXT_EXCHANGE_ID_TIME', '/ccxt/:exchangeId/time', ...ccxtMiddleware, controller.ccxt.fetchTime);
  router.get('CCXT_EXCHANGE_ID_STATUS', '/ccxt/:exchangeId/status', ...ccxtMiddleware, controller.ccxt.fetchStatus);

  router.get('CCXT_EXCHANGE_ID_MARKET_SYMBOL', '/ccxt/:exchangeId/market/:symbol', ...ccxtMiddleware, controller.ccxt.fetchMarket);
  router.get('CCXT_EXCHANGE_ID_MARKETS', '/ccxt/:exchangeId/markets', ...ccxtMiddleware, controller.ccxt.fetchMarkets);
  router.get('CCXT_EXCHANGE_ID_MARKET_ID_SYMBOL', '/ccxt/:exchangeId/market_id/:symbol', ...ccxtMiddleware, controller.ccxt.fetchMarketId);
  router.get('CCXT_EXCHANGE_ID_MARKET_IDS', '/ccxt/:exchangeId/market_ids', ...ccxtMiddleware, controller.ccxt.fetchMarketIds);

  router.get('CCXT_EXCHANGE_ID_SYMBOL_SYMBOL', '/ccxt/:exchangeId/symbol/:symbol', ...ccxtMiddleware, controller.ccxt.fetchSymbol);
  router.get('CCXT_EXCHANGE_ID_SYMBOLS', '/ccxt/:exchangeId/symbols', ...ccxtMiddleware, controller.ccxt.fetchSymbols);

  router.get('CCXT_EXCHANGE_ID_CURRENCIES', '/ccxt/:exchangeId/currencies', ...ccxtMiddleware, controller.ccxt.fetchCurrencies);

  router.get('CCXT_EXCHANGE_ID_IDS', '/ccxt/:exchangeId/ids', ...ccxtMiddleware, controller.ccxt.fetchIds);

  router.get('CCXT_EXCHANGE_ID_ORDERBOOK_SYMBOL', '/ccxt/:exchangeId/orderbook/:symbol', ...ccxtMiddleware, controller.ccxt.fetchOrderBook);
  router.get('CCXT_EXCHANGE_ID_ORDERBOOK2_SYMBOL', '/ccxt/:exchangeId/orderbook2/:symbol', ...ccxtMiddleware, controller.ccxt.fetchL2OrderBook);
  router.get('CCXT_EXCHANGE_ID_ORDERBOOK3_SYMBOL', '/ccxt/:exchangeId/orderbook3/:symbol', ...ccxtMiddleware, controller.ccxt.fetchL3OrderBook);
  router.get('CCXT_EXCHANGE_ID_DEPTH_SYMBOL', '/ccxt/:exchangeId/depth/:symbol', ...ccxtMiddleware, controller.ccxt.fetchDepth);
  router.get('CCXT_EXCHANGE_ID_PRICE_SYMBOL', '/ccxt/:exchangeId/price/:symbol', ...ccxtMiddleware, controller.ccxt.fetchPrice);

  router.get('CCXT_EXCHANGE_ID_OHLCV_SYMBOL', '/ccxt/:exchangeId/ohlcv/:symbol', ...ccxtMiddleware, controller.ccxt.fetchOHLCV);

  router.get('CCXT_EXCHANGE_ID_TRADES_SYMBOL', '/ccxt/:exchangeId/trades/:symbol', ...ccxtMiddleware, controller.ccxt.fetchTrades);

  router.get('CCXT_EXCHANGE_ID_TICKER_SYMBOL', '/ccxt/:exchangeId/ticker/:symbol', ...ccxtMiddleware, controller.ccxt.fetchTicker);
  router.get('CCXT_EXCHANGE_ID_TICKERS', '/ccxt/:exchangeId/tickers', ...ccxtMiddleware, controller.ccxt.fetchTickers);

  router.get('CMC_CRYPTOCURRENCY_LISTINGS_LATEST', '/cmc/cryptocurrency/listings/latest', middleware.cache.cmc({}, app), controller.cmc.cryptoCurrencyListingsLatest);
  router.get('CMC_CRYPTOCURRENCY_INFO', '/cmc/cryptocurrency/info', middleware.cache.cmc({}, app), controller.cmc.cryptoCurrencyMetadata);
  router.get('CMC_KEY_INFO', '/cmc/key/info', middleware.cache.cmc({}, app), controller.cmc.keyInfo);

  // router.get('/v1/account/accounts', controller.account.accounts);

  // router.get(
  //   'account_balance',
  //   '/v1/account/accounts/:id/balance',
  //   controller.account.balance,
  // );

  // router.get('ws', '/v1/ws/account/sign', controller.account.signWs);

  const jwt = app.passport.authenticate('jwt', {
    session: false,
    successReturnToOrRedirect: undefined,
  });

  router.post('AUTH_REGISTER', '/auth/register', controller.passport.register);
  router.post('AUTH_LOGIN', '/auth/login', controller.passport.login);
  router.get('AUTH_LOGOUT', '/auth/logout', jwt, controller.passport.logout);

  router.get('USER_PROFILE', '/user/profile', jwt, controller.passport.profile);
};
