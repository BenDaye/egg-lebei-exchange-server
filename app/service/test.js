'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  async sayHi(name) {
    return `hi, ${name}`;
  }
}

module.exports = TestService;
