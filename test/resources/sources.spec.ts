import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Sources from '../../src/resources/sources';

describe('Sources', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'sources';
  const key = 'my_project:src/foo/Bar.php';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Sources(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('raw');
    expect(init).to.respondTo('scm');
    expect(init).to.respondTo('show');
  });

  it('should get valid raw url', async () => {
    const stubResult = {
      status: 200,
      data: 'sources raw [too large here]',
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const source = new Sources(axiosInstance);
    const result = await source.raw(key);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/raw`, {
      params: { key, branch: undefined, pullRequest: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get valid scm url', async () => {
    const stubResult = {
      status: 200,
      data: {
        scm: [
          [1, 'julien', '2013-03-13T12:34:56+0100', 'a1e2b3e5d6f5'],
          [2, 'julien', '2013-03-14T13:17:22+0100', 'b1e2b3e5d6f5'],
          [3, 'simon', '2014-01-01T15:35:36+0100', 'c1e2b3e5d6f5'],
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const source = new Sources(axiosInstance);
    const result = await source.scm(key);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/scm`, {
      params: {
        key,
        commits_by_line: false,
        from: 1,
        to: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get valid show url', async () => {
    const stubResult = {
      status: 200,
      data: {
        sources: [
          [20, '<span class="k">package </span>org.sonar.check;'],
          [21, ''],
          [22, '<span class="k">public </span><span class="k">enum </span><span class="sym-922 sym">Priority</span> {'],
          [23, '  <span class="cppd">/**</span>'],
          [24, '<span class="cppd">   * WARNING : DO NOT CHANGE THE ENUMERATION ORDER</span>'],
          [25, '<span class="cppd">   * the enum ordinal is used for db persistence</span>'],
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const source = new Sources(axiosInstance);
    const result = await source.show(key);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/show`, {
      params: { key, from: 1, to: undefined },
    })).to.equal(true);
    stubGet.restore();
  });
});
