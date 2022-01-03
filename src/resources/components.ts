import { AxiosInstance } from 'axios';
import * as SonarDefinition from '../enums';

export default class Components {
  instance: AxiosInstance;

  readonly path = 'components';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  search(
    organization: string,
    q?: string,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        organization,
        p,
        ps,
        q,
      },
    });
  }

  show(component: string, branch?: string, pullRequest?: number) {
    return this.instance.get(`${this.path}/show`, { params: { component, branch, pullRequest } });
  }

  tree(
    component: string,
    branch?: string,
    pullRequest?: number,
    q? : string,
    qualifiers?: SonarDefinition.SonarComponentsQualifiers,
    s: SonarDefinition.SonarSortFields[] = [SonarDefinition.SonarSortFields.name],
    strategy: SonarDefinition.SonarSearchStrategy = SonarDefinition.SonarSearchStrategy.all,
    asc = true,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/tree`, {
      params: {
        component,
        s: s.join(','),
        strategy,
        asc,
        p,
        ps,
        branch,
        pullRequest,
        q,
        qualifiers,
      },
    });
  }
}
