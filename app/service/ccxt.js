'use strict';

const Service = require('egg').Service;

class CcxtService extends Service {
  exchange() {
    return this.ctx.exchange.describe();
  }

  checkRequiredCredentials() {
    return this.ctx.exchange.checkRequiredCredentials();
  }

  fetchTime() {
    return this.ctx.exchange.fetchTime();
  }

  fetchStatus() {
    return this.ctx.exchange.fetchStatus();
  }

  fetchMarket(symbol) {
    return this.ctx.exchange.market(symbol);
  }

  fetchMarkets() {
    return this.ctx.exchange.markets;
  }

  fetchMarketId(symbol) {
    return this.ctx.exchange.marketId(symbol);
  }

  fetchMarketIds(symbols) {
    return this.ctx.exchange.marketIds(symbols);
  }

  fetchSymbol(symbols) {
    return this.ctx.exchange.symbol(symbols);
  }

  fetchSymbols() {
    return this.ctx.exchange.symbols;
  }

  fetchCurrencies() {
    return this.ctx.exchange.currencies;
  }

  fetchIds() {
    return this.ctx.exchange.ids;
  }

  fetchOrderBook(symbol) {
    return this.ctx.exchange.fetchOrderBook(symbol, 20);
  }

  fetchL2OrderBook(symbol) {
    return this.ctx.exchange.fetchL2OrderBook(symbol, 20);
  }

  fetchL3OrderBook(symbol) {
    return this.ctx.exchange.fetchL3OrderBook(symbol, 20);
  }

  async fetchDepth(symbol) {
    const result = await this.ctx.exchange.fetchOrderBook(symbol, 20);
    const { bids, asks } = result;
    const _bids = [];
    const _asks = [];
    for (const bid of bids)
      _bids.push(
        bids
          .filter(v => v[0] <= bid[0])
          .reduce((p, c) => [ bid[0], c[1] + p[1] ])
      );

    for (const ask of asks)
      _asks.push(
        asks
          .filter(v => v[0] <= ask[0])
          .reduce((p, c) => [ ask[0], c[1] + p[1] ])
      );

    result.bids = _bids;
    result.asks = _asks;

    return result;
  }

  async fetchPrice(symbol) {
    const { bids, asks } = await this.ctx.exchange.fetchOrderBook(symbol, 20);
    const bid = bids.length ? bids[0][0] : undefined;
    const ask = asks.length ? asks[0][0] : undefined;
    const spread = bid && ask ? ask - bid : undefined;
    return {
      bid,
      ask,
      spread,
    };
  }

  async fetchTicker(symbol, original = false) {
    if (original) return await this.ctx.exchange.fetchTicker(symbol);
    const result = await this.ctx.exchange.fetchTickers([ symbol ]);
    return result[symbol];
  }

  fetchTickers(symbols) {
    return this.ctx.exchange.fetchTickers(symbols);
  }

  fetchOHLCV(symbol, period = '1m') {
    return this.ctx.exchange.fetchOHLCV(symbol, period);
  }

  fetchTrades(symbol) {
    return this.ctx.exchange.fetchTrades(symbol);
  }
}

module.exports = CcxtService;
