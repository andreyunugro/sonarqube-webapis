import { AxiosInstance } from 'axios';
import utils from '../utils';

export enum ProjectAnalysesCategory {
  version = 'VERSION',
  other = 'OTHER',
}

export enum ProjectAnalysesEventCategory {
  version = 'VERSION',
  other = 'OTHER',
  qualityProfile = 'QUALITY_PROFILE',
  qualityGate = 'QUALITY_GATE',
  definitionChange = 'DEFINITION_CHANGE',
}

export default class ProjectAnalyses {
  instance: AxiosInstance;

  readonly path = 'project_analyses';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  createEvent(
    analysis: string,
    name: string,
    category: ProjectAnalysesCategory = ProjectAnalysesCategory.other,
  ) {
    return this.instance.post(`${this.path}/create_event`, utils.objectToPostParam({
      analysis, name, category,
    }));
  }

  delete(analysis: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ analysis }));
  }

  deleteEvent(event: string) {
    return this.instance.post(`${this.path}/delete_event`, utils.objectToPostParam({ event }));
  }

  search(
    project: string,
    branch?: string,
    category?: ProjectAnalysesEventCategory,
    from?: string,
    to?: string,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        project, branch, category, from, to, p, ps,
      },
    });
  }

  setBaseline(
    analysis: string,
    project: string,
    branch?: string,
  ) {
    return this.instance.post(`${this.path}/set_baseline`, utils.objectToPostParam({
      analysis, project, branch,
    }));
  }

  unsetBaseline(
    project: string,
    branch?: string,
  ) {
    return this.instance.post(`${this.path}/unset_baseline`, utils.objectToPostParam({
      project, branch,
    }));
  }

  updateEvent(event: string, name: string) {
    return this.instance.post(`${this.path}/update_event`, utils.objectToPostParam({ event, name }));
  }
}
