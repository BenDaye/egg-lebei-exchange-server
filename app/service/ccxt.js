'use strict';

const Service = require('egg').Service;

class CcxtService extends Service {
  exchange() {
    try {
      return this.ctx.exchange.describe();
    } catch (err) {
      throw err;
    }
  }

  checkRequiredCredentials() {
    try {
      return this.ctx.exchange.checkRequiredCredentials();
    } catch (err) {
      throw err;
    }
  }

  async fetchTime() {
    try {
      return await this.ctx.exchange.fetchTime();
    } catch (err) {
      throw err;
    }
  }

  async fetchStatus() {
    try {
      return await this.ctx.exchange.fetchStatus();
    } catch (err) {
      throw err;
    }
  }

  async fetchMarket(symbol) {
    try {
      return await this.ctx.exchange.market(symbol);
    } catch (err) {
      throw err;
    }
  }

  fetchMarkets() {
    try {
      return this.ctx.exchange.markets;
    } catch (err) {
      throw err;
    }
  }

  fetchMarketId(symbol) {
    try {
      return this.ctx.exchange.marketId(symbol);
    } catch (err) {
      throw err;
    }
  }

  fetchMarketIds(symbols) {
    try {
      return this.ctx.exchange.marketIds(symbols);
    } catch (err) {
      throw err;
    }
  }

  fetchSymbol(symbols) {
    try {
      return this.ctx.exchange.symbol(symbols);
    } catch (err) {
      throw err;
    }
  }

  fetchSymbols() {
    try {
      return this.ctx.exchange.symbols;
    } catch (err) {
      throw err;
    }
  }

  fetchCurrencies() {
    try {
      return this.ctx.exchange.currencies;
    } catch (err) {
      throw err;
    }
  }

  fetchIds() {
    try {
      return this.ctx.exchange.ids;
    } catch (err) {
      throw err;
    }
  }

  async fetchOrderBook(symbol) {
    try {
      return await this.ctx.exchange.fetchOrderBook(symbol);
    } catch (err) {
      throw err;
    }
  }

  async fetchL2OrderBook(symbol) {
    try {
      return await this.ctx.exchange.fetchL2OrderBook(symbol);
    } catch (err) {
      throw err;
    }
  }

  async fetchL3OrderBook(symbol) {
    try {
      return await this.ctx.exchange.fetchL3OrderBook(symbol);
    } catch (err) {
      throw err;
    }
  }

  async fetchDepth(symbol) {
    try {
      const result = await this.ctx.exchange.fetchOrderBook(symbol);
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
    } catch (err) {
      throw err;
    }
  }

  async fetchPrice(symbol) {
    try {
      const { bids, asks } = await this.ctx.exchange.fetchOrderBook(symbol);
      const bid = bids.length ? bids[0][0] : undefined;
      const ask = asks.length ? asks[0][0] : undefined;
      const spread = bid && ask ? ask - bid : undefined;
      return {
        bid,
        ask,
        spread,
      };
    } catch (err) {
      throw err;
    }
  }

  async fetchTicker(symbol, original = false) {
    try {
      if (original) return await this.ctx.exchange.fetchTicker(symbol);
      const result = await this.ctx.exchange.fetchTickers([ symbol ]);
      return result[symbol];
    } catch (err) {
      throw err;
    }
  }

  async fetchTickers(symbols) {
    try {
      return await this.ctx.exchange.fetchTickers(symbols);
    } catch (err) {
      throw err;
    }
  }

  async fetchOHLCV(symbol, period = '1m') {
    try {
      return await this.ctx.exchange.fetchOHLCV(symbol, period);
    } catch (err) {
      throw err;
    }
  }

  async fetchTrades(symbol) {
    try {
      return await this.ctx.exchange.fetchTrades(symbol);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CcxtService;
