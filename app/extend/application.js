'use strict';

const SocksProxyAgent = require('socks-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');

const HTTPS_PROXY_AGENT = Symbol('Application#httpsProxyAgent');
const SOCKS_PROXY_AGENT = Symbol('Application#socksProxyAgent');

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
};
