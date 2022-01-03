import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class ProjectTags {
  instance: AxiosInstance;

  readonly path = 'project_tags';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  search(q?: string, ps = 10) {
    return this.instance.get(`${this.path}/search`, { params: { q, ps } });
  }

  set(project: string, tags: string[]) {
    return this.instance.post(`${this.path}/set`, utils.objectToPostParam({
      project,
      tags: tags.join(','),
    }));
  }
}
