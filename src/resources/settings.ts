import { AxiosInstance } from 'axios';
import utils from '../utils';

export default class Settings {
  instance: AxiosInstance;

  readonly path = 'settings';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  listDefinitions(component?: string) {
    return this.instance.get(`${this.path}/list_definitions`, { params: { component } });
  }

  reset(keys: string[], branch?: string, component?: string, pullRequest?: string) {
    return this.instance.post(`${this.path}/reset`, utils.objectToPostParam({
      keys: keys.join(','),
      branch,
      component,
      pullRequest,
    }));
  }

  set(key: string, component?: string, fieldValues?: string, value?: string, values?: string[]) {
    let postParams = utils.objectToPostParam({
      key, component, fieldValues, value,
    });
    if (typeof values !== 'undefined') {
      postParams = `${postParams}&${utils.arrayToPostParam('values', values)}`;
    }
    return this.instance.post(`${this.path}/set`, postParams);
  }

  values(component?: string, keys?: string[]) {
    return this.instance.get(`${this.path}/values`, {
      params: {
        component,
        keys: (typeof keys !== 'undefined' && keys.length > 0) ? keys.join(',') : undefined,
      },
    });
  }
}
