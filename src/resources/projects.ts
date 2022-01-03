import { AxiosInstance } from 'axios';
import utils from '../utils';

export enum ProjectsVisibility {
  private = 'private',
  public = 'public',
}

export default class Projects {
  instance: AxiosInstance;

  readonly path = 'projects';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  bulkDelete(
    organization: string,
    analyzedBefore?: string,
    projects?: string[],
    q?: string,
    onProvisionedOnly = false,
  ) {
    return this.instance.post(`${this.path}/bulk_delete`, utils.objectToPostParam({
      organization,
      analyzedBefore,
      projects: (typeof projects !== 'undefined' && projects.length > 0) ? projects.join(',') : undefined,
      q,
      onProvisionedOnly,
    }));
  }

  create(name: string, organization: string, project: string, visibility?: ProjectsVisibility) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      name, organization, project, visibility,
    }));
  }

  delete(project: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ project }));
  }

  search(
    organization: string,
    analyzedBefore?: string,
    projects?: string[],
    q?: string,
    onProvisionedOnly = false,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        organization,
        analyzedBefore,
        projects: (typeof projects !== 'undefined' && projects.length > 0) ? projects.join(',') : undefined,
        q,
        onProvisionedOnly,
        p,
        ps,
      },
    });
  }

  updateKey(from: string, to: string) {
    return this.instance.post(`${this.path}/update_key`, utils.objectToPostParam({
      from, to,
    }));
  }

  updateVisibility(project: string, visibility: ProjectsVisibility) {
    return this.instance.post(`${this.path}/update_visibility`, utils.objectToPostParam({
      project, visibility,
    }));
  }
}
