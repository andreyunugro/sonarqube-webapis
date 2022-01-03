import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class UserTokens {
  instance: AxiosInstance;

  readonly path = 'user_tokens';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  generate(name: string, login?: string) {
    return this.instance.post(`${this.path}/generate`, utils.objectToPostParam({ name, login }));
  }

  revoke(name: string, login?: string) {
    return this.instance.post(`${this.path}/revoke`, utils.objectToPostParam({ name, login }));
  }

  search() {
    return this.instance.get(`${this.path}/search`);
  }
}
