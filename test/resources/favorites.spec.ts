import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Favorites from '../../src/resources/favorites';

describe('Favorites', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'favorites';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Favorites(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('add');
    expect(init).to.respondTo('remove');
    expect(init).to.respondTo('search');
  });

  it('should post correct favorites add', async () => {
    const key = 'my_project';
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const fav = new Favorites(axiosInstance);
    const result = await fav.add(key);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add`, `component=${key}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct favorites remove', async () => {
    const key = 'my_project';
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const fav = new Favorites(axiosInstance);
    const result = await fav.remove(key);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove`, `component=${key}`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 3,
        },
        favorites: [{
          organization: 'my-org',
          key: 'K2',
          name: 'Apache HBase',
          qualifier: 'TRK',
        },
        {
          organization: 'openjdk',
          key: 'K3',
          name: 'JDK9',
          qualifier: 'TRK',
        },
        {
          organization: 'my-org',
          key: 'K1',
          name: 'Samba',
          qualifier: 'TRK',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const fav = new Favorites(axiosInstance);
    const result = await fav.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        p: 1,
        ps: 100,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
