import { AxiosInstance } from 'axios';
import * as SonarDefinition from '../enums';

export enum MeasuresAdditionalFields {
  metrics = 'metrics',
  periods = 'periods',
}

export enum MeasuresMetricSortFilter {
  all = 'all',
  withMeasuresOnly = 'withMeasuresOnly',
}

export default class Measures {
  instance: AxiosInstance;

  readonly path = 'measures';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  component(
    component: string,
    metricKeys: SonarDefinition.SonarMetricKey[],
    additionalFields?: MeasuresAdditionalFields[],
    branch?: string,
    pullRequest?: number,
  ) {
    const params: {
      component: string,
      metricKeys: string,
      additionalFields?: string,
      branch?: string,
      pullRequest?: number,
    } = {
      component,
      metricKeys: metricKeys.join(','),
      branch,
      pullRequest,
    };
    if (typeof additionalFields !== 'undefined' && additionalFields.length > 0) {
      params.additionalFields = additionalFields.join(',');
    }
    return this.instance.get(`${this.path}/component`, { params });
  }

  componentTree(
    component: string,
    metricKeys: SonarDefinition.SonarMetricKey[],
    additionalFields?: MeasuresAdditionalFields[],
    branch?: string,
    pullRequest?: number,
    q?: string,
    qualifiers?: SonarDefinition.SonarComponentsQualifiers[],
    metricPeriodSort?: number,
    metricSort?: SonarDefinition.SonarMetricKey,
    metricSortFilter: MeasuresMetricSortFilter = MeasuresMetricSortFilter.all,
    asc = true,
    p = 1,
    ps = 100,
    s: SonarDefinition.SonarSortFields[] = [SonarDefinition.SonarSortFields.name],
    strategy: SonarDefinition.SonarSearchStrategy = SonarDefinition.SonarSearchStrategy.all,
  ) {
    const params: {
      component: string,
      metricKeys: string,
      metricSortFilter: MeasuresMetricSortFilter,
      asc: boolean,
      p: number,
      ps: number,
      s: string,
      strategy: string
      additionalFields?: string,
      branch?: string,
      pullRequest?: number,
      q?: string,
      qualifiers?: string,
      metricPeriodSort?: number,
      metricSort?: SonarDefinition.SonarMetricKey,
    } = {
      component,
      metricKeys: metricKeys.join(','),
      metricSortFilter,
      asc,
      p,
      ps,
      s: s.join(','),
      strategy,
      branch,
      pullRequest,
      q,
      metricPeriodSort,
      metricSort,
    };
    if (typeof additionalFields !== 'undefined' && additionalFields.length > 0) {
      params.additionalFields = additionalFields.join(',');
    }
    if (typeof qualifiers !== 'undefined' && qualifiers.length > 0) {
      params.qualifiers = qualifiers.join(',');
    }
    return this.instance.get(`${this.path}/component_tree`, { params });
  }

  searchHistory(
    component: string,
    metrics: SonarDefinition.SonarMetricKey[],
    branch?: string,
    from?: string,
    to?: string,
    pullRequest?: number,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/search_history`, {
      params: {
        component,
        metrics: metrics.join(','),
        p,
        ps,
        branch,
        from,
        to,
        pullRequest,
      },
    });
  }
}
