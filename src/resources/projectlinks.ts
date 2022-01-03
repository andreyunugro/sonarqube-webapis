import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class ProjectLinks {
  instance: AxiosInstance;

  readonly path = 'project_links';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  create(name: string, url: string, projectId?: string, projectKey?: string) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      name, url, projectId, projectKey,
    }));
  }

  delete(id: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ id }));
  }

  search(projectId?: string, projectKey?: string) {
    return this.instance.get(`${this.path}/search`, { params: { projectId, projectKey } });
  }
}
