import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectLinks from '../../src/resources/projectlinks';

describe('Project Links', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_links';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectLinks(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('search');
  });

  it('should post correct create project link', async () => {
    const stubResult = {
      status: 200,
      data: {
        link: {
          id: '18',
          name: 'Custom',
          url: 'http://example.org',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pl = new ProjectLinks(axiosInstance);
    const result = await pl.create('custom', 'http://example.com');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, 'name=custom&url=http%3A%2F%2Fexample.com')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete project link', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pl = new ProjectLinks(axiosInstance);
    const result = await pl.delete('17');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, 'id=17')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search project link', async () => {
    const stubResult = {
      status: 200,
      data: {
        links: [{
          id: '1',
          name: 'Homepage',
          type: 'homepage',
          url: 'http://example.org',
        }, {
          id: '2',
          name: 'Custom',
          type: 'custom',
          url: 'http://example.org/custom',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pl = new ProjectLinks(axiosInstance);
    const result = await pl.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        projectId: undefined,
        projectKey: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
