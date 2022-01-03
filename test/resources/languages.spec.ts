import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { Languages } from '../../src/resources';

describe('Languages', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'languages';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Languages(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('list');
  });

  it('should get correct list url', async () => {
    const stubResult = {
      status: 200,
      data: {
        languages: [{
          key: 'c', name: 'C',
        }, {
          key: 'cpp', name: 'C++',
        }, {
          key: 'java', name: 'Java',
        }, {
          key: 'js', name: 'JavaScript',
        }, {
          key: 'python', name: 'Python',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const lang = new Languages(axiosInstance);
    const result = await lang.list();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, {
      params: {
        q: undefined,
        ps: 0,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
