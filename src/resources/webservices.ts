import { AxiosInstance } from 'axios';

export default class WebServices {
  instance: AxiosInstance;

  readonly path = 'webservices';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  list() {
    return this.instance.get(`${this.path}/list`);
  }

  responseExample(controller: string, action: string) {
    return this.instance.get(`${this.path}/response_example`, {
      params: { action, controller },
    });
  }
}
