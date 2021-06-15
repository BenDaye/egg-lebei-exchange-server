import { Controller } from 'egg';

export default class PassportController extends Controller {
  private async handleSuccess(data: any) {
    this.ctx.body = {
      status: 1,
      message: 'success',
      data,
    };
    return;
  }

  private async handleError(err: any) {
    this.ctx.body = {
      status: 0,
      message: `PassportController: ${err?.message}`,
    };
    return;
  }

  public async logout() {
    this.ctx.logout();
    this.handleSuccess(null);
  }

  public async profile() {
    try {
      this.handleSuccess(this.ctx.user);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async register() {
    try {
      const { username, password } = this.ctx.request.body;
      await this.ctx.service.auth.register(username, password);
      this.handleSuccess(null);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async login() {
    try {
      const { username, password } = this.ctx.request.body;
      this.handleSuccess(await this.ctx.service.auth.login(username, password));
    } catch (err) {
      this.handleError(err);
    }
  }
}
