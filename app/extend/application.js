'use strict';

const SocksProxyAgent = require('socks-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');
const LRUCache = require('lru-cache');

const HTTPS_PROXY_AGENT = Symbol('Application#httpsProxyAgent');
const SOCKS_PROXY_AGENT = Symbol('Application#socksProxyAgent');

let CCXT = {};

const CCXT_CACHE = new LRUCache({ maxAge: 1000 * 2, max: 500 });
const JUHE_CACHE = new LRUCache({ maxAge: 1000 * 60 * 60, max: 500 });
const COIN_MARKET_CAP_CACHE = new LRUCache({ maxAge: 1000 * 60 * 60, max: 500 });


module.exports = {
  get httpsProxyAgent() {
    if (!this[HTTPS_PROXY_AGENT])
      this[HTTPS_PROXY_AGENT] = HttpsProxyAgent('http://127.0.0.1:7890');

    return this[HTTPS_PROXY_AGENT];
  },
  get socksProxyAgent() {
    if (!this[SOCKS_PROXY_AGENT])
      this[SOCKS_PROXY_AGENT] = SocksProxyAgent('socks://127.0.0.1:7890');

    return this[SOCKS_PROXY_AGENT];
  },
  get ccxt() {
    return CCXT;
  },
  setCcxt(value) {
    CCXT = value;
  },
  get ccxtCache() {
    return CCXT_CACHE;
  },
  get juheCache() {
    return JUHE_CACHE;
  },
  get coinMarketCapCache() {
    return COIN_MARKET_CAP_CACHE;
  },
};
