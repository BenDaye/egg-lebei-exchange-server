import { Controller } from 'egg';
import ccxt = require('ccxt');

export default class CcxtController extends Controller {
  private async handleSuccess(data: any) {
    const needQuery = [ '/tickers', '/ohlcv', '/market_ids' ].some(v => this.ctx.URL.pathname.includes(v));
    const key = needQuery ? this.ctx.url.toLowerCase() : this.ctx.URL.pathname.toLowerCase();
    this.app.ccxtCache.set(key, data);
    this.ctx.onSuccess(data);
    return;
  }

  public async exchanges() {
    try {
      this.handleSuccess(ccxt.exchanges);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async version() {
    try {
      this.handleSuccess(ccxt.version);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async exchange() {
    try {
      this.handleSuccess(this.ctx.exchange.describe());
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async checkRequiredCredentials() {
    try {
      this.handleSuccess(this.ctx.exchange.checkRequiredCredentials());
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchTime() {
    try {
      this.handleSuccess(await this.ctx.exchange.fetchTime());
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchStatus() {
    try {
      this.handleSuccess(await this.ctx.exchange.fetchStatus());
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchMarket() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.market(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchMarkets() {
    try {
      this.handleSuccess(this.ctx.exchange.markets);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchMarketId() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.marketId(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchMarketIds() {
    try {
      const symbols = this.ctx.queries.symbol ? this.ctx.queries.symbol.map(symbol => symbol.toString().toUpperCase().replace('_', '/')) : [];
      this.handleSuccess(this.ctx.exchange.marketIds(symbols));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchSymbol() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(this.ctx.exchange.symbol(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchSymbols() {
    try {
      this.handleSuccess(this.ctx.exchange.symbols);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchCurrencies() {
    try {
      this.handleSuccess(this.ctx.exchange.currencies);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchIds() {
    try {
      this.handleSuccess(this.ctx.exchange.ids);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchOrderBook() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchOrderBook(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchL2OrderBook() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchL2OrderBook(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchL3OrderBook() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchL3OrderBook(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchDepth() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const result = await this.ctx.exchange.fetchOrderBook(symbol);
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
      this.ctx.onError(err);
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
      this.ctx.onError(err);
    }
  }

  public async fetchTicker() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      if (this.ctx.query.original?.toString() === 'true') {
        this.handleSuccess(await this.ctx.exchange.fetchTickers(symbol));
      }
      const result = await this.ctx.exchange.fetchTickers([ symbol ]);
      this.handleSuccess(result[symbol]);
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchTickers() {
    try {
      const symbols = this.ctx.queries.symbol?.length ? this.ctx.queries.symbol.map(symbol => symbol.toString().toUpperCase().replace('_', '/')) : undefined;
      this.handleSuccess(await this.ctx.exchange.fetchTickers(symbols));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchOHLCV() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      const period = this.ctx.query.period || '1m';
      this.handleSuccess(await this.ctx.exchange.fetchOHLCV(symbol, period));
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  public async fetchTrades() {
    try {
      const symbol = this.ctx.params.symbol.toString().toUpperCase().replace('_', '/');
      this.handleSuccess(await this.ctx.exchange.fetchTrades(symbol));
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}
