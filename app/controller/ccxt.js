'use strict';

const Controller = require('egg').Controller;
const ccxt = require('ccxt');

class CcxtController extends Controller {
  getSymbol() {
    return this.ctx.params.symbol.toUpperCase().replace('_', '/');
  }

  getSymbols() {
    return this.ctx.queries.symbol
      ? this.ctx.queries.symbol.map(symbol =>
        symbol.toUpperCase().replace('_', '/')
      )
      : undefined;
  }

  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  }

  async exchanges() {
    try {
      this.ctx.onSuccess(ccxt.exchanges);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async version() {
    try {
      this.ctx.onSuccess(ccxt.version);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async exchange() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.exchange();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async checkRequiredCredentials() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.checkRequiredCredentials();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTime() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchTime();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchStatus() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchStatus();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarket() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchMarket(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarkets() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchMarkets();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarketId() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.marketId(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarketIds() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbols = this.getSymbols() || [];
      const getDataFunction = () => this.service.ccxt.marketIds(symbols);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchSymbol() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchSymbol(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchSymbols() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchSymbols();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchCurrencies() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchCurrencies();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchIds() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchIds();
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchOrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchOrderBook(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchL2OrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchL2OrderBook(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchL3OrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchL3OrderBook(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchDepth() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchDepth(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchPrice() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchPrice(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTicker() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchTicker(
        symbol, this.ctx.query.original &&
            this.ctx.query.original.toString() === 'true'
      );
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTickers() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbols = this.getSymbols();
      const getDataFunction = () => this.service.ccxt.fetchTickers(symbols);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchOHLCV() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbol = this.getSymbol();
      const period = this.ctx.query.period || '1m';
      const getDataFunction = () => this.service.ccxt.fetchOHLCV(symbol, period);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTrades() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchTrades(symbol);
      const data = await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2);
      this.ctx.onSuccess(data);
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = CcxtController;
