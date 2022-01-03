import { AxiosInstance } from 'axios';

export enum CEStatus {
  success = 'SUCCESS',
  failed = 'FAILED',
  canceled = 'CANCELED',
  pending = 'PENDING',
  inProgress = 'IN_PROGRESS',
}

export enum CEAdditionalFields {
  scannerContext = 'scannerContext',
  warnings = 'warnings',
}

export default class CE {
  instance: AxiosInstance;

  readonly path = 'ce';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  activity(
    component?: string,
    maxExecutedAt?: string,
    minSubmittedAt?: string,
    q?: string,
    type?: string,
    onlyCurrents = false,
    ps = 100,
    status = [CEStatus.success, CEStatus.failed, CEStatus.canceled],
  ) {
    return this.instance.get(`${this.path}/activity`, {
      params: {
        component,
        maxExecutedAt,
        minSubmittedAt,
        q,
        type,
        onlyCurrents,
        ps,
        status: status.join(','),
      },
    });
  }

  activityStatus(componentId?: string) {
    return this.instance.get(`${this.path}/activity_status`, { params: { componentId } });
  }

  component(component?: string) {
    return this.instance.get(`${this.path}/component`, { params: { component } });
  }

  task(id: string, additionalFields?: CEAdditionalFields[]) {
    return this.instance.get(`${this.path}/task`, {
      params: {
        id,
        additionalFields: (typeof additionalFields !== 'undefined' && additionalFields.length > 0) ? additionalFields.join(',') : undefined,
      },
    });
  }
}
