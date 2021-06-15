import { AuthenticationResult, Service } from 'egg';
import jwt = require('jsonwebtoken');

export default class Auth extends Service {
  public async register(username: string, password: string): Promise<any> {
    return await this.app.model.Account.register(
      new this.app.model.Account({
        username,
      }),
      password,
    );
  }

  public async login(username: string, password: string): Promise<any> {
    const { user, error }: AuthenticationResult = await this.app.model.Account.authenticate()(username, password);
    if (error) throw error;

    return jwt.sign(user.username, this.app.config.passportJwt.secret);
  }
}
