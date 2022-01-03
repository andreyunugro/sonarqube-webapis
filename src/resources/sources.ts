import { AxiosInstance } from 'axios';

export default class Sources {
  instance: AxiosInstance;

  readonly path = 'sources';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  raw(key: string, branch?: string, pullRequest?: number) {
    return this.instance.get(`${this.path}/raw`, { params: { key, branch, pullRequest } });
  }

  scm(key: string, to?: number, commitsByLine = false, from: number = 1) {
    return this.instance.get(`${this.path}/scm`, {
      params: {
        key, commits_by_line: commitsByLine, from, to,
      },
    });
  }

  /**
   * Get source code from specific file in the organization project.
   * @param {string} key File key: organization_project:full_path_file
   * @param {number} from Line to return.
   * @param {number} to Last line to return.
   */
  show(key: string, to?: number, from: number = 1) {
    return this.instance.get(`${this.path}/show`, { params: { key, from, to } });
  }
}
