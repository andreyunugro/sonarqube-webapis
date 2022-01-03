import { AxiosInstance } from 'axios';
import { SonarMetricKey, SonarSelected } from '../enums';
import utils from '../utils';

export enum QualityGatesOperator {
  lt = 'LT',
  gt = 'GT',
}

export default class QualityGates {
  instance: AxiosInstance;

  readonly path = 'qualitygates';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  copy(id: string, name: string, organization: string) {
    return this.instance.post(`${this.path}/copy`, utils.objectToPostParam({
      id, name, organization,
    }));
  }

  create(name: string, organization: string) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      name, organization,
    }));
  }

  createCondition(
    error: number,
    gateId: string,
    metric: SonarMetricKey[],
    organization: string,
    op?: QualityGatesOperator,
  ) {
    return this.instance.post(`${this.path}/create_condition`, utils.objectToPostParam({
      error: `${error}`,
      gateId,
      metric: metric.join(','),
      organization,
      op,
    }));
  }

  deleteCondition(id: string, organization: string) {
    return this.instance.post(`${this.path}/delete_condition`, utils.objectToPostParam({
      id, organization,
    }));
  }

  deselect(organization: string, projectKey?: string) {
    return this.instance.post(`${this.path}/deselect`, utils.objectToPostParam({
      organization, projectKey,
    }));
  }

  destroy(id: string, organization: string) {
    return this.instance.post(`${this.path}/destroy`, utils.objectToPostParam({
      id, organization,
    }));
  }

  getByProject(organization: string, project: string) {
    return this.instance.get(`${this.path}/get_by_project`, { params: { organization, project } });
  }

  list(organization: string) {
    return this.instance.get(`${this.path}/list`, { params: { organization } });
  }

  projectStatus(
    analysisId?: string,
    branch?: string,
    projectId?: string,
    projectKey?: string,
    pullRequest?: string,
  ) {
    return this.instance.get(`${this.path}/project_status`, {
      params: {
        analysisId, branch, projectId, projectKey, pullRequest,
      },
    });
  }

  rename(id: string, name: string, organization: string) {
    return this.instance.post(`${this.path}/rename`, utils.objectToPostParam({
      id, name, organization,
    }));
  }

  search(
    gateId: string,
    organization: string,
    pageSize?: string,
    query?: string,
    page = 1,
    selected: SonarSelected = SonarSelected.selected,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        gateId, organization, pageSize, query, page, selected,
      },
    });
  }

  select(gateId: string, organization: string, projectId?: string, projectKey?: string) {
    return this.instance.post(`${this.path}/select`, utils.objectToPostParam({
      gateId, organization, projectId, projectKey,
    }));
  }

  setAsDefault(id: string, organization: string) {
    return this.instance.post(`${this.path}/set_as_default`, utils.objectToPostParam({
      id, organization,
    }));
  }

  show(organization: string, id?: string, name?: string) {
    return this.instance.get(`${this.path}/show`, { params: { organization, id, name } });
  }

  updateCondition(
    error: number,
    id: string,
    metric: SonarMetricKey[],
    organization: string,
    op?: QualityGatesOperator,
  ) {
    return this.instance.post(`${this.path}/update_condition`, utils.objectToPostParam({
      error: `${error}`,
      id,
      metric: metric.join(','),
      organization,
      op,
    }));
  }
}
