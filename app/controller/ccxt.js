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
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async checkRequiredCredentials() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.checkRequiredCredentials();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTime() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = async () => await this.service.ccxt.fetchTime();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchStatus() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = async () => await this.service.ccxt.fetchStatus();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarket() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchMarket(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarkets() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchMarkets();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarketId() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.marketId(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchMarketIds() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbols = this.getSymbols() || [];
      const getDataFunction = () => this.service.ccxt.marketIds(symbols);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchSymbol() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = () => this.service.ccxt.fetchSymbol(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchSymbols() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchSymbols();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchCurrencies() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchCurrencies();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchIds() {
    try {
      const cacheKey = this.getCacheKey();
      const getDataFunction = () => this.service.ccxt.fetchIds();
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchOrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchOrderBook(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchL2OrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchL2OrderBook(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchL3OrderBook() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchL3OrderBook(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchDepth() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchDepth(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchPrice() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchPrice(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTicker() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchTicker(
          symbol, this.ctx.query.original &&
            this.ctx.query.original.toString() === 'true'
        );
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTickers() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbols = this.getSymbols();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchTickers(symbols);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchOHLCV() {
    try {
      const cacheKey = this.getCacheKey(false);
      const symbol = this.getSymbol();
      const period = this.ctx.query.period || '1m';

      const getDataFunction = async () =>
        await this.service.ccxt.fetchOHLCV(symbol, period);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async fetchTrades() {
    try {
      const cacheKey = this.getCacheKey();
      const symbol = this.getSymbol();
      const getDataFunction = async () =>
        await this.service.ccxt.fetchTrades(symbol);
      this.ctx.onSuccess(
        await this.service.cache.getFromCtx(cacheKey, getDataFunction, 2)
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = CcxtController;
