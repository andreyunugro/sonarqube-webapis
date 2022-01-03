import { AxiosInstance } from 'axios';

export default class Metrics {
  instance: AxiosInstance;

  readonly path = 'metrics';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  search(p = 1, ps = 100) {
    return this.instance.get(`${this.path}/search`, { params: { p, ps } });
  }

  types() {
    return this.instance.get(`${this.path}/types`);
  }
}
