import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class Favorites {
  instance: AxiosInstance;

  readonly path = 'favorites';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  add(component: string) {
    return this.instance.post(`${this.path}/add`, utils.objectToPostParam({ component }));
  }

  remove(component: string) {
    return this.instance.post(`${this.path}/remove`, utils.objectToPostParam({ component }));
  }

  search(p = 1, ps = 100) {
    return this.instance.get(`${this.path}/search`, {
      params: { p, ps },
    });
  }
}
