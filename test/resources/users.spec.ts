import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { SonarSelected } from '../../src/enums';
import Users from '../../src/resources/users';

describe('Users', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'users';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Users(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('groups');
    expect(init).to.respondTo('search');
  });

  it('should get correct group url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 25,
          total: 2,
        },
        groups: [{
          id: 1,
          name: 'sonar-admins',
          description: 'Sonar Admins',
          selected: false,
          default: false,
        }, {
          id: 2,
          name: 'sonar-users',
          description: 'Sonar Users',
          selected: true,
          default: true,
        }],
      },

    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const u = new Users(axiosInstance);
    const result = await u.groups('admin', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/groups`, {
      params: {
        login: 'admin',
        organization: 'my-org',
        q: undefined,
        selected: SonarSelected.selected,
        p: 1,
        ps: 25,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct validate url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 50,
          total: 2,
        },
        users: [{
          login: 'fmallet',
          name: 'Freddy Mallet',
          active: true,
          email: 'f@m.com',
          groups: [
            'sonar-administrators',
            'sonar-users',
          ],
          tokensCount: 1,
          local: true,
          externalIdentity: 'fmallet',
          externalProvider: 'sonarqube',
          avatar: '2f9dff586d3f74f825b059e3798a3bbb',
        }, {
          login: 'sbrandhof',
          name: 'Simon',
          active: true,
          email: 's.brandhof@company.tld',
          scmAccounts: [
            'simon.brandhof',
            's.brandhof@company.tld',
          ],
          groups: [
            'sonar-users',
          ],
          tokensCount: 3,
          local: false,
          externalIdentity: 'sbrandhof@ldap.com',
          externalProvider: 'LDAP',
          avatar: '3930ad855bc7fe48db8e9a663174cdd3',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const u = new Users(axiosInstance);
    const result = await u.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        q: undefined,
        p: 1,
        ps: 50,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
