import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class ProjectPullRequests {
  instance: AxiosInstance;

  readonly path = 'project_pull_requests';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  delete(project: string, pullRequest: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ project, pullRequest }));
  }

  list(project: string) {
    return this.instance.get(`${this.path}/list`, { params: { project } });
  }
}
