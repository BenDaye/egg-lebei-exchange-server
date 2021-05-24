
import SocksProxyAgent = require('socks-proxy-agent');
import HttpsProxyAgent = require('https-proxy-agent');
import ccxt = require('ccxt');
import LRU = require('lru-cache');

const HTTPS_PROXY_AGENT = Symbol('Application#httpsProxyAgent');
const SOCKS_PROXY_AGENT = Symbol('Application#socksProxyAgent');

type Exchanges = Record<string, ccxt.Exchange>;
let CCXT: Exchanges = {};

const CCXT_CACHE: LRU<string, any> = new LRU<string, any>({ maxAge: 1000 * 2, max: 500 });

module.exports = {
  get httpsProxyAgent() {
    if (!this[HTTPS_PROXY_AGENT]) {
      this[HTTPS_PROXY_AGENT] = HttpsProxyAgent('http://127.0.0.1:7890');
    }
    return this[HTTPS_PROXY_AGENT];
  },
  get socksProxyAgent() {
    if (!this[SOCKS_PROXY_AGENT]) {
      this[SOCKS_PROXY_AGENT] = SocksProxyAgent('socks://127.0.0.1:7890');
    }
    return this[SOCKS_PROXY_AGENT];
  },
  get ccxt(): Exchanges {
    return CCXT;
  },
  setCcxt(value: Exchanges) {
    CCXT = value;
  },
  get ccxtCache(): LRU<string, any> {
    return CCXT_CACHE;
  },
};
