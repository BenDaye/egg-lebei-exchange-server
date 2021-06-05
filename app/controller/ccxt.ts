import { Controller } from 'egg';
import ccxt = require('ccxt');

export default class CcxtController extends Controller {
  public async handleSuccess(data) {
    const result = {
      status: 1,
      message: 'success',
      data,
    };
    const key = this.ctx.url.toLowerCase();
    this.app.ccxtCache.set(key, result);
    this.ctx.body = result;
    return;
  }
  public async handleError(e) {
    if (e instanceof ccxt.NetworkError) {
      this.ctx.body = {
        status: 700,
        message: `NetworkError: ${e.message}`,
      };
      return;
    } else if (e instanceof ccxt.ExchangeError) {
      this.ctx.body = {
        status: 701,
        message: `ExchangeError: ${e.message}`,
      };
      return;
    }
    this.ctx.body = {
      status: 0,
      message: `Error: ${e.message}`,
    };
    return;
  }

  public async exchanges() {
    try {
      this.handleSuccess(ccxt.exchanges);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async exchange() {
    try {
      this.handleSuccess(this.ctx.exchange.describe());
    } catch (err) {
      this.handleError(err);
    }
  }

  public async checkRequiredCredentials() {
    try {
      this.handleSuccess(this.ctx.exchange.checkRequiredCredentials());
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchTime() {
    try {
      this.handleSuccess(await this.ctx.exchange.fetchTime());
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchStatus() {
    try {
      this.handleSuccess(await this.ctx.exchange.fetchStatus());
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchMarket() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.market(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchMarkets() {
    try {
      this.handleSuccess(this.ctx.exchange.markets);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchMarketId() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.marketId(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchMarketIds() {
    try {
      const symbols = this.ctx.queries.symbol ? this.ctx.queries.symbol.map(symbol => symbol.toString().toUpperCase().replace('_', '/')) : [];
      this.handleSuccess(this.ctx.exchange.marketIds(symbols));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchSymbol() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.symbol(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchSymbols() {
    try {
      this.handleSuccess(this.ctx.exchange.symbols);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchCurrencies() {
    try {
      this.handleSuccess(this.ctx.exchange.currencies);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchIds() {
    try {
      this.handleSuccess(this.ctx.exchange.ids);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchOrderBook() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchOrderBook(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchDepth() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const result = await this.ctx.exchange.fetchOrderBook(symbol, 20, { group: 1 });
      const { bids, asks } = result;
      const _bids: [number, number][] = [];
      const _asks: [number, number][] = [];
      for (const bid of bids) {
        _bids.push(bids.filter(v => v[0] <= bid[0]).reduce((p, c) => [ bid[0], c[1] + p[1] ]));
      }
      for (const ask of asks) {
        _asks.push(asks.filter(v => v[0] <= ask[0]).reduce((p, c) => [ ask[0], c[1] + p[1] ]));
      }

      result.bids = _bids;
      result.asks = _asks;
      this.handleSuccess(result);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchPrice() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const { bids, asks } = await this.ctx.exchange.fetchOrderBook(symbol);
      const bid = bids.length ? bids[0][0] : undefined;
      const ask = asks.length ? asks[0][0] : undefined;
      const spread = (bid && ask) ? ask - bid : undefined;
      this.handleSuccess({
        bid,
        ask,
        spread,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchTicker() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const result = await this.ctx.exchange.fetchTickers([ symbol ]);
      this.handleSuccess(result[symbol]);
      // this.handleSuccess(await this.ctx.exchange.fetchTickers(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchTickers() {
    try {
      const symbols = this.ctx.queries.symbol ? this.ctx.queries.symbol.map(symbol => symbol.toString().toUpperCase().replace('_', '/')) : undefined;
      this.handleSuccess(await this.ctx.exchange.fetchTickers(symbols));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchOHLCV() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const period = this.ctx.query.period || '1m';
      this.handleSuccess(await this.ctx.exchange.fetchOHLCV(symbol, period));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async fetchTrades() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchTrades(symbol));
    } catch (err) {
      this.handleError(err);
    }
  }
}
