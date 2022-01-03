import { AxiosInstance } from 'axios';
import { SonarSelected } from '../enums';

export default class Users {
  instance: AxiosInstance;

  readonly path = 'users';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  groups(
    login: string,
    organization: string,
    q?: string,
    selected: SonarSelected = SonarSelected.selected,
    p = 1,
    ps = 25,
  ) {
    return this.instance.get(`${this.path}/groups`, {
      params: {
        login,
        organization,
        q,
        selected,
        p,
        ps,
      },
    });
  }

  search(q?: string, p = 1, ps = 50) {
    return this.instance.get(`${this.path}/search`, {
      params: { q, p, ps },
    });
  }
}
