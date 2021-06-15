import { Controller } from 'egg';

export default class AccountController extends Controller {
  public async accounts() {
    const { AccessKeyId, SecretKey } = this.ctx.query;
    const { data } = await this.ctx.service.http.account.accounts({
      AccessKeyId,
      SecretKey,
    });
    this.ctx.body = data;
  }

  public async balance() {
    const { AccessKeyId, SecretKey } = this.ctx.query;
    const { id } = this.ctx.params;
    const { data } = await this.ctx.service.http.account.balance({
      AccessKeyId,
      SecretKey,
      id,
    });
    this.ctx.body = data;
  }

  public async signWs() {
    const { accessKey, secretKey } = this.ctx.query;
    this.ctx.body = await this.ctx.service.ws.account.sign({
      accessKey,
      secretKey,
    });
  }
}
