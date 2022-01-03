import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Notifications, { NotificationsType } from '../../src/resources/notifications';

describe('Notifications', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'notifications';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Notifications(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('add');
    expect(init).to.respondTo('list');
    expect(init).to.respondTo('remove');
  });

  it('should post correct add notification', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const notify = new Notifications(axiosInstance);
    const result = await notify.add(NotificationsType.newAlerts);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add`, `type=${NotificationsType.newAlerts}&channel=EmailNotificationChannel`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct list notifications', async () => {
    const stubResult = {
      status: 200,
      data: {
        notifications: [{
          channel: 'EmailChannel',
          type: 'MyNewIssues',
        }, {
          channel: 'EmailChannel',
          type: 'NewIssues',
        }, {
          channel: 'TwitterChannel',
          type: 'MyNewIssues',
        }, {
          channel: 'EmailChannel',
          type: 'MyNewIssues',
          organization: 'my-org-1',
          project: 'my_project',
          projectName: 'My Project',
        }, {
          channel: 'EmailChannel',
          type: 'NewQualityGateStatus',
          organization: 'my-org-1',
          project: 'my_project',
          projectName: 'My Project',
        }, {
          channel: 'TwitterChannel',
          type: 'MyNewIssues',
          organization: 'my-org-1',
          project: 'my_project',
          projectName: 'My Project',
        }],
        channels: ['EmailChannel', 'TwitterChannel'],
        globalTypes: [{
          key: 'MyNewIssues',
          isVisibleOnlyForOrgMembers: false,
        }, {
          key: 'NewIssues',
          isVisibleOnlyForOrgMembers: false,
        }, {
          key: 'NewQualityGateStatus',
          isVisibleOnlyForOrgMembers: false,
        }],
        perProjectTypes: [{
          key: 'MyNewIssues',
          isVisibleOnlyForOrgMembers: false,
        }, {
          key: 'NewQualityGateStatus',
          isVisibleOnlyForOrgMembers: false,
        }, {
          key: 'CeReportTaskFailure',
          isVisibleOnlyForOrgMembers: true,
        }, {
          key: 'ChangesOnMyIssue',
          isVisibleOnlyForOrgMembers: true,
        }],
        organizations: [{
          key: 'my-org-1',
          name: 'MyOrgName',
          isMember: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const notify = new Notifications(axiosInstance);
    const result = await notify.list();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, { params: { login: undefined } })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct remove notification', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const notify = new Notifications(axiosInstance);
    const result = await notify.remove(NotificationsType.newAlerts);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove`, `type=${NotificationsType.newAlerts}&channel=EmailNotificationChannel`)).to.equal(true);
    stubPost.restore();
  });
});
