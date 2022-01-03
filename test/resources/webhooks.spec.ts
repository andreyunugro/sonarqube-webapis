import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Webhooks from '../../src/resources/webhooks';

describe('Webhooks', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'webhooks';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Webhooks(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('deliveries');
    expect(init).to.respondTo('delivery');
    expect(init).to.respondTo('list');
    expect(init).to.respondTo('update');
  });

  it('should post correct create webhook', async () => {
    const stubResult = {
      status: 200,
      data: {
        webhook: {
          key: 'uuid',
          name: 'My webhook',
          url: 'https://www.my-webhook-listener.com/sonar',
          secret: 'your_secret',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.create(stubResult.data.webhook.name, 'my-org', stubResult.data.webhook.url, 'my_project', 'your_secret');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, `name=${stubResult.data.webhook.name.replace(/\s/g, '+')}&organization=my-org&url=${stubResult.data.webhook.url.replace(/\//g, '%2F').replace(/:/g, '%3A')}&project=my_project&secret=your_secret`)).to.equal(true);
    // Without project and secret.
    const noSecret = await wh.create(stubResult.data.webhook.name, 'my-org', stubResult.data.webhook.url);
    expect(noSecret).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/create`, `name=${stubResult.data.webhook.name.replace(/\s/g, '+')}&organization=my-org&url=${stubResult.data.webhook.url.replace(/\//g, '%2F').replace(/:/g, '%3A')}`)).to.equal(true);
    stubPost.restore();
  });

  it('should able to delete webhook', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.delete('my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, 'webhook=my_project')).to.equal(true);
    stubPost.restore();
  });

  it('should get recent deliveries', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 10,
          total: 1,
        },
        deliveries: [{
          id: 'd1',
          componentKey: 'my-project',
          ceTaskId: 'task-1',
          name: 'Jenkins',
          url: 'http://jenkins',
          at: '2017-07-14T04:40:00+0200',
          success: true,
          httpStatus: 200,
          durationMs: 10,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.deliveries();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/deliveries`, {
      params: {
        ceTaskId: undefined,
        componentKey: undefined,
        webhook: undefined,
        p: 1,
        ps: 10,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should able to get delivery', async () => {
    const stubResult = {
      status: 200,
      data: {
        delivery: {
          id: 'd1',
          componentKey: 'my-project',
          ceTaskId: 'task-1',
          name: 'Jenkins',
          url: 'http://jenkins',
          at: '2017-07-14T04:40:00+0200',
          success: true,
          httpStatus: 200,
          durationMs: 10,
          payload: '{"status"="SUCCESS"}',
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.delivery('AU-TpxcA-iU5OvuD2FL3');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/delivery`, {
      params: { deliveryId: 'AU-TpxcA-iU5OvuD2FL3' },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get list of webhooks', async () => {
    const stubResult = {
      status: 200,
      data: {
        webhooks: [{
          key: 'UUID-1',
          name: 'my first webhook',
          url: 'http://www.my-webhook-listener.com/sonarqube',
        }, {
          key: 'UUID-2',
          name: 'my 2nd webhook',
          url: 'https://www.my-other-webhook-listener.com/fancy-listner',
          secret: 'your_secret',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.list('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, {
      params: { organization: 'my-org', project: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct update webhook', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const wh = new Webhooks(axiosInstance);
    const result = await wh.update('My Webhook', 'https://www.google.com/sonar', 'my_project', 'your_secret');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update`, 'name=My+Webhook&url=https%3A%2F%2Fwww.google.com%2Fsonar&webhook=my_project&secret=your_secret')).to.equal(true);
    // Withour secret.
    const noSecret = await wh.update('My Webhook', 'https://www.google.com/sonar', 'my_project');
    expect(noSecret).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/update`, 'name=My+Webhook&url=https%3A%2F%2Fwww.google.com%2Fsonar&webhook=my_project')).to.equal(true);
    stubPost.restore();
  });
});
