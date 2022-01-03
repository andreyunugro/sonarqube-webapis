import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class ProjectBranches {
  instance: AxiosInstance;

  readonly path = 'project_branches';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  delete(branch: string, project: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ branch, project }));
  }

  list(project: string) {
    return this.instance.get(`${this.path}/list`, { params: { project } });
  }

  rename(name: string, project: string) {
    return this.instance.post(`${this.path}/rename`, utils.objectToPostParam({ name, project }));
  }
}
