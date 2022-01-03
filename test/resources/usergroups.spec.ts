import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { SonarSelected } from '../../src/enums';
import UserGroups from '../../src/resources/usergroups';

describe('User Groups', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'user_groups';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new UserGroups(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('addUser');
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('removeUser');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('update');
    expect(init).to.respondTo('users');
  });

  it('should post correct add user', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.addUser('42', 'sonar-administrators');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_user`, 'id=42&name=sonar-administrators')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct create user group', async () => {
    const stubResult = {
      status: 200,
      data: {
        group: {
          id: '42',
          organization: 'my-org',
          name: 'some-product-bu',
          description: 'Business Unit for Some Awesome Product',
          membersCount: 0,
          default: false,
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.create('sonar-users', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, 'name=sonar-users&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete user group', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.delete('42', 'sonar-administrators');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, 'id=42&name=sonar-administrators')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete user from group', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.removeUser('42', 'sonar-administrators');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_user`, 'id=42&name=sonar-administrators')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search user group', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 2,
        },
        groups: [{
          id: 3,
          name: 'users',
          description: 'Users',
          membersCount: 17,
          default: true,
        }, {
          id: 4,
          name: 'administrators',
          description: 'Administrators',
          membersCount: 2,
          default: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.search('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        organization: 'my-org',
        f: undefined,
        q: undefined,
        p: 1,
        ps: 100,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct update user group', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.update('42');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update`, 'id=42')).to.equal(true);
    stubPost.restore();
  });

  it('should get list user to a group', async () => {
    const stubResult = {
      status: 200,
      data: {
        users: [{
          login: 'admin',
          name: 'Administrator',
          selected: true,
        }, {
          login: 'george.orwell',
          name: 'George Orwell',
          selected: true,
        }],
        p: 1,
        ps: 25,
        total: 2,
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ug = new UserGroups(axiosInstance);
    const result = await ug.users();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/users`, {
      params: {
        id: undefined,
        name: undefined,
        organization: undefined,
        q: undefined,
        p: 1,
        ps: 100,
        selected: SonarSelected.selected,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
