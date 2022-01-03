import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectTags from '../../src/resources/projecttags';

describe('Project Tags', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_tags';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectTags(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('set');
  });

  it('should get correct search tag', async () => {
    const stubResult = {
      status: 200,
      data: {
        tags: ['official', 'offshore', 'playoff'],
      },

    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pt = new ProjectTags(axiosInstance);
    const result = await pt.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        q: undefined,
        ps: 10,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct set tag', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pt = new ProjectTags(axiosInstance);
    const result = await pt.set('my_project', ['finance', 'offshore']);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set`, 'project=my_project&tags=finance%2Coffshore')).to.equal(true);
    stubPost.restore();
  });
});
