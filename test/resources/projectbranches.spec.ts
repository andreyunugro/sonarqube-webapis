import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectBranches from '../../src/resources/projectbranches';

describe('Project Branches', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_branches';
  const branch = 'branch1';
  const project = 'my_project';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectBranches(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('list');
    expect(init).to.respondTo('rename');
  });

  it('should post correct delete project branch', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pb = new ProjectBranches(axiosInstance);
    const result = await pb.delete(branch, project);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, `branch=${branch}&project=${project}`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct list project branch', async () => {
    const stubResult = {
      status: 200,
      data: {
        branches: [
          {
            name: 'feature/foo2',
            isMain: false,
            type: 'SHORT',
            mergeBranch: 'master',
            status: {
              qualityGateStatus: 'OK',
              bugs: 1,
              vulnerabilities: 0,
              codeSmells: 0,
            },
            analysisDate: '2017-09-02T13:37:00+0100',
            commit: {
              sha: 'P1A5AxmsWdy1WPk0YRk48lVPDuYcy4EgUjtm2oGXt6LKdM6YS9',
            },
          },
          {
            name: 'feature/foo',
            isMain: false,
            type: 'SHORT',
            mergeBranch: 'master',
            status: {
              qualityGateStatus: 'OK',
              bugs: 1,
              vulnerabilities: 0,
              codeSmells: 0,
            },
            analysisDate: '2017-08-03T13:37:00+0100',
            commit: {
              sha: 'P1A5AxmsWdy1WPk0YRk48lVPDuYcy4EgUjtm2oGXt6LKdM6YS9',
            },
          },
          {
            name: 'master',
            isMain: true,
            type: 'LONG',
            status: {
              qualityGateStatus: 'ERROR',
            },
            analysisDate: '2017-04-01T01:15:42+0100',
            commit: {
              sha: 'P1A5AxmsWdy1WPk0YRk48lVPDuYcy4EgUjtm2oGXt6LKdM6YS9',
            },
          },
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pb = new ProjectBranches(axiosInstance);
    const result = await pb.list(project);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, { params: { project } })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct rename project branch', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pb = new ProjectBranches(axiosInstance);
    const result = await pb.rename(branch, project);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/rename`, `name=${branch}&project=${project}`)).to.equal(true);
    stubPost.restore();
  });
});
