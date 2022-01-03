import { AxiosInstance } from 'axios';

export default class Languages {
  instance: AxiosInstance;

  readonly path = 'languages';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  list(q?: string, ps = 0) {
    return this.instance.get(`${this.path}/list`, {
      params: { q, ps },
    });
  }
}
