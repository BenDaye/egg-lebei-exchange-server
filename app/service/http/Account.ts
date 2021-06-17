import { Service } from 'egg';
import { HttpClientResponse } from 'urllib/lib';

interface BaseParams {
  AccessKeyId: string
  SecretKey: string
}

export default class Account extends Service {
  public async accounts({ AccessKeyId, SecretKey }: BaseParams): Promise<HttpClientResponse<any>> {
    const Url = '/v1/account/accounts';
    const signature = this.ctx.helper.sign({ Url, AccessKeyId, SecretKey });
    return await this.ctx.curl(`${this.config.huobiHttpBaseUrl}${Url}?${signature}`);
  }

  public async balance({ AccessKeyId, SecretKey, id }): Promise<HttpClientResponse<any>> {
    const Url = `/v1/account/accounts/${id}/balance`;
    const signature = this.ctx.helper.sign({ Url, AccessKeyId, SecretKey });
    return await this.ctx.curl(`${this.config.huobiHttpBaseUrl}${Url}?${signature}`);
  }
}
