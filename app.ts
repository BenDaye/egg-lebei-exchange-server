import { IBoot } from 'egg';
// import { Application, IBoot } from 'egg';
// import assert = require('assert');

export default class FooBoot implements IBoot {
  // private readonly app: Application;

  // constructor(app: Application) {
  //   this.app = app;
  // }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    // this.app.passport.verify(async (ctx, user) => {
    //   // assert(user.id, 'user.id should exists');

    //   const existsUser = await ctx.model.Account.findOne({ _id: user.id });
    //   console.log(existsUser);

    //   return user;
    // });
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
