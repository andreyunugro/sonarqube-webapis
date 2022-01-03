import { AxiosInstance } from 'axios';

export default class Authentication {
  instance: AxiosInstance;

  readonly path = 'authentication';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  logout() {
    return this.instance.post(`${this.path}/logout`);
  }

  validate() {
    return this.instance.get(`${this.path}/validate`);
  }
}
