import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Projects, { ProjectsVisibility } from '../../src/resources/projects';

describe('Projects', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'projects';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Projects(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('bulkDelete');
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('updateKey');
    expect(init).to.respondTo('updateVisibility');
  });

  it('should post correct bulk delete project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.bulkDelete('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/bulk_delete`, 'organization=my-org&onProvisionedOnly=false')).to.equal(true);
    const nextResult = await p.bulkDelete('my-org', undefined, ['my_project']);
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/bulk_delete`, 'organization=my-org&projects=my_project&onProvisionedOnly=false')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct create project', async () => {
    const stubResult = {
      status: 200,
      data: {
        project: {
          key: 'project-key',
          name: 'project-name',
          qualifier: 'TRK',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.create('SonarQube', 'my-org', 'my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, 'name=SonarQube&organization=my-org&project=my_project')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.delete('my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, 'project=my_project')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search project', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 2,
        },
        components: [{
          organization: 'my-org-1',
          key: 'project-key-1',
          name: 'Project Name 1',
          qualifier: 'TRK',
          visibility: 'public',
          lastAnalysisDate: '2017-03-01T11:39:03+0300',
          revision: 'cfb82f55c6ef32e61828c4cb3db2da12795fd767',
        }, {
          organization: 'my-org-1',
          key: 'project-key-2',
          name: 'Project Name 1',
          qualifier: 'TRK',
          visibility: 'private',
          lastAnalysisDate: '2017-03-02T15:21:47+0300',
          revision: '7be96a94ac0c95a61ee6ee0ef9c6f808d386a355',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.search('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        organization: 'my-org',
        analyzedBefore: undefined,
        projects: undefined,
        q: undefined,
        onProvisionedOnly: false,
        p: 1,
        ps: 100,
      },
    })).to.equal(true);
    const nextResult = await p.search('my-org', undefined, ['my_project']);
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubGet.calledWithExactly(`${path}/search`, {
      params: {
        organization: 'my-org',
        analyzedBefore: undefined,
        projects: 'my_project',
        q: undefined,
        onProvisionedOnly: false,
        p: 1,
        ps: 100,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct update key project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.updateKey('my_old_project', 'my_new_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update_key`, 'from=my_old_project&to=my_new_project')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct update visibility project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const p = new Projects(axiosInstance);
    const result = await p.updateVisibility('my_project', ProjectsVisibility.public);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update_visibility`, `project=my_project&visibility=${ProjectsVisibility.public}`)).to.equal(true);
    stubPost.restore();
  });
});
