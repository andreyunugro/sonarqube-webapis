import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import UserTokens from '../../src/resources/usertokens';

describe('User Tokens', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'user_tokens';
  const name = 'Project scan on Travis';
  const login = 'g.hopper';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new UserTokens(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('generate');
    expect(init).to.respondTo('revoke');
    expect(init).to.respondTo('search');
  });

  it('should post valid user token generate', async () => {
    const stubResult = {
      status: 200,
      data: {
        login: 'grace.hopper',
        name: 'Third Party Application',
        createdAt: '2018-01-10T14:06:05+0100',
        token: '123456789',
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const token = new UserTokens(axiosInstance);
    const result = await token.generate(name, login);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/generate`, `name=${name.replace(/\s/g, '+')}&login=${login}`))
      .to.equal(true);

    const result2 = await token.generate(name);
    expect(result2).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/generate`, `name=${name.replace(/\s/g, '+')}`)).to.equal(true);

    stubPost.restore();
  });

  it('should post valid user token revoke', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const token = new UserTokens(axiosInstance);
    const result = await token.revoke(name, login);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/revoke`, `name=${name.replace(/\s/g, '+')}&login=${login}`))
      .to.equal(true);

    const result2 = await token.revoke(name);
    expect(result2).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/revoke`, `name=${name.replace(/\s/g, '+')}`)).to.equal(true);

    stubPost.restore();
  });

  it('should get valid search url', async () => {
    const stubResult = {
      status: 200,
      data: {
        login: 'grace.hopper',
        userTokens: [{
          name: 'Project scan on AppVeyor',
          createdAt: '2015-08-02T15:44:27+0200',
        }, {
          name: 'Project scan on Jenkins',
          createdAt: '2015-04-08T21:57:47+0200',
        }, {
          name: 'Project scan on Travis',
          createdAt: '2015-11-26T08:31:07+0100',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const token = new UserTokens(axiosInstance);
    const result = await token.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`)).to.equal(true);
    stubGet.restore();
  });
});
