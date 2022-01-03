import { AxiosInstance } from 'axios';

export default class Duplications {
  instance: AxiosInstance;

  readonly path = 'duplications';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  show(key: string, branch?: string, pullRequest?: number) {
    return this.instance.get(`${this.path}/show`, { params: { key, branch, pullRequest } });
  }
}
