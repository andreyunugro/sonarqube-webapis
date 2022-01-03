import { AxiosInstance } from 'axios';

export enum ProjectBadgesMetric {
  bugs = 'bugs',
  codeSmells = 'code_smells',
  coverage = 'coverage',
  duplicatedLinesDensity = 'duplicated_lines_density',
  ncloc = 'ncloc',
  sqaleRating = 'sqale_rating',
  alertStatus = 'alert_status',
  reliabilityRating = 'reliability_rating',
  securityRating = 'security_rating',
  sqaleIndex = 'sqale_index',
  vulnerabilities = 'vulnerabilities',
}

export default class ProjectBadges {
  instance: AxiosInstance;

  readonly path = 'project_badges';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  measure(project: string, metric: ProjectBadgesMetric, branch?: string, token?: string) {
    return this.instance.get(`${this.path}/measure`, {
      params: {
        project,
        metric,
        branch,
        token,
      },
    });
  }

  qualityGate(project: string, branch?: string, token?: string) {
    return this.instance.get(`${this.path}/quality_gate`, {
      params: { project, branch, token },
    });
  }
}
