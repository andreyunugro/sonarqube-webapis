import { AxiosInstance } from 'axios';
import utils from '../utils';

export enum NotificationsType {
  ceReportTaskFailure = 'CeReportTaskFailure',
  changesOnMyIssue = 'ChangesOnMyIssue',
  sqMyNewIssues = 'SQ-MyNewIssues',
  newAlerts = 'NewAlerts',
  newFalsePositiveIssue = 'NewFalsePositiveIssue',
  newIssues = 'NewIssues',
}

export default class Notifications {
  instance: AxiosInstance;

  readonly path = 'notifications';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  add(type: NotificationsType, project?: string, login?: string, channel = 'EmailNotificationChannel') {
    return this.instance.post(`${this.path}/add`, utils.objectToPostParam({
      type, project, login, channel,
    }));
  }

  list(login?: string) {
    return this.instance.get(`${this.path}/list`, { params: { login } });
  }

  remove(type: NotificationsType, project?: string, login?: string, channel = 'EmailNotificationChannel') {
    return this.instance.post(`${this.path}/remove`, utils.objectToPostParam({
      type, project, login, channel,
    }));
  }
}
