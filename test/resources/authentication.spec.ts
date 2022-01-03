import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Authentication from '../../src/resources/authentication';

describe('Authentication', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'authentication';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Authentication(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('logout');
    expect(init).to.respondTo('validate');
  });

  it('should post correct logout url', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const logout = new Authentication(axiosInstance);
    const result = await logout.logout();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/logout`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct validate url', async () => {
    const stubResult = { status: 200, data: { valid: true } };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const validate = new Authentication(axiosInstance);
    const result = await validate.validate();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/validate`)).to.equal(true);
    stubGet.restore();
  });
});
