import { AxiosInstance } from 'axios';
import { SonarSelected } from '../enums';
import utils from '../utils';

export enum UserGroupsSearchField {
  name = 'name',
  description = 'description',
  membersCount = 'membersCount',
}

export default class UserGroups {
  instance: AxiosInstance;

  readonly path = 'user_groups';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  addUser(id: string, name: string, organization?: string, login?: string) {
    return this.instance.post(`${this.path}/add_user`, utils.objectToPostParam({
      id, name, organization, login,
    }));
  }

  create(name: string, organization: string, description?: string) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      name, organization, description,
    }));
  }

  delete(id: string, name: string, organization?: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({
      id, name, organization,
    }));
  }

  removeUser(id: string, name: string, organization?: string, login?: string) {
    return this.instance.post(`${this.path}/remove_user`, utils.objectToPostParam({
      id, name, organization, login,
    }));
  }

  search(organization: string, f?: UserGroupsSearchField, q?: string, p = 1, ps = 100) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        organization,
        f,
        q,
        p,
        ps,
      },
    });
  }

  update(id: string, name?: string, description?: string) {
    return this.instance.post(`${this.path}/update`, utils.objectToPostParam({
      id, name, description,
    }));
  }

  users(
    id?: string,
    name?: string,
    organization?: string,
    q?: string,
    p = 1,
    ps = 100,
    selected: SonarSelected = SonarSelected.selected,
  ) {
    return this.instance.get(`${this.path}/users`, {
      params: {
        id, name, organization, q, p, ps, selected,
      },
    });
  }
}
