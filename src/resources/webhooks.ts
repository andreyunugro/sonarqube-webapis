import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class Webhooks {
  instance: AxiosInstance;

  readonly path = 'webhooks';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  create(name: string, organization: string, url: string, project?: string, secret?: string) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      name, organization, url, project, secret,
    }));
  }

  delete(webhook: string) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({ webhook }));
  }

  deliveries(ceTaskId?: string, componentKey?: string, webhook?: string, p = 1, ps = 10) {
    return this.instance.get(`${this.path}/deliveries`, {
      params: {
        ceTaskId, componentKey, webhook, p, ps,
      },
    });
  }

  delivery(deliveryId: string) {
    return this.instance.get(`${this.path}/delivery`, {
      params: { deliveryId },
    });
  }

  list(organization: string, project?: string) {
    return this.instance.get(`${this.path}/list`, {
      params: { organization, project },
    });
  }

  update(name: string, url: string, webhook: string, secret?: string) {
    return this.instance.post(`${this.path}/update`, utils.objectToPostParam({
      name, url, webhook, secret,
    }));
  }
}
