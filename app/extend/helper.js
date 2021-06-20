'use strict';

const stringify = require('query-string').stringify;
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');
const assert = require('assert');

const snackCase = value => {
  return value
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
};

module.exports = {
  now() {
    return new Date(Date.now()).toISOString().split('.')[0];
  },
  sign({ Method = 'GET', AccessKeyId, SignatureMethod = 'HmacSHA256', SignatureVersion = 2, Host = 'api.huobi.pro', Url, Timestamp, SecretKey, ...params }) {
    assert(AccessKeyId, 'AccessKeyId');
    assert(SecretKey, 'SecretKey');
    assert(Url, 'Url');

    Timestamp = Timestamp || encodeURIComponent(this.now());

    const sortedString = stringify(this.sortObjectKey({ AccessKeyId, SignatureMethod, SignatureVersion, Timestamp, ...(params || {}) }, false), { encode: false });

    const signature = hmacSHA256([ Method, Host, Url, sortedString ].join('\n'), SecretKey);

    return `${sortedString}&Signature=${encodeURIComponent(Base64.stringify(signature))}`;
  },
  signWs({ accessKey, secretKey, signatureMethod = 'HmacSHA256', signatureVersion = 2.1, timestamp, method = 'GET', host = 'api.huobi.pro', url = '/ws/v2' }) {
    assert(accessKey, 'accessKey');
    assert(secretKey, 'secretKey');

    timestamp = timestamp || this.now();

    const sortedString = stringify(this.sortObjectKey({ accessKey, signatureMethod, signatureVersion, timestamp: encodeURIComponent(timestamp) }, false), { encode: false });

    const signature = hmacSHA256([ method, host, url, sortedString ].join('\n'), secretKey);

    return {
      authType: 'api',
      accessKey,
      signatureMethod,
      signatureVersion: `${signatureVersion}`,
      timestamp,
      signature: Base64.stringify(signature),
    };
  },
  sortObjectKey(object, convertSnakeCaseKey = false) {
    if (typeof object !== 'object') return object;
    if (Array.isArray(object))
      return object.map(obj => this.sortObjectKey(obj, convertSnakeCaseKey));

    return Object.keys(object)
      .sort()
      .reduce((obj, key) => {
        if (convertSnakeCaseKey) {
          obj[snackCase(key)] = this.sortObjectKey(
            object[key], convertSnakeCaseKey
          );
          return obj;
        }
        obj[key] = this.sortObjectKey(object[key], convertSnakeCaseKey);
        return obj;
      }, {});
  },
  getCacheKey(pathname = true) {
    return pathname ? this.ctx.URL.pathname.toLowerCase() : this.ctx.url.toLowerCase();
  },
};
