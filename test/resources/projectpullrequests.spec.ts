import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectPullRequests from '../../src/resources/projectpullrequests';

describe('Project Pull Requests', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_pull_requests';
  const project = 'my_project';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectPullRequests(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('list');
  });

  it('should post correct delete pull request', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pr = new ProjectPullRequests(axiosInstance);
    const result = await pr.delete(project, '1543');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, `project=${project}&pullRequest=1543`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct list url', async () => {
    const stubResult = {
      status: 200,
      data: {
        pullRequests: [{
          key: '123',
          title: 'Add feature X',
          branch: 'feature/bar',
          base: 'feature/foo',
          status: {
            qualityGateStatus: 'OK',
            bugs: 0,
            vulnerabilities: 0,
            codeSmells: 0,
          },
          analysisDate: '2017-04-01T02:15:42+0200',
          url: 'https://github.com/SonarSource/sonar-core-plugins/pull/32',
          target: 'feature/foo',
          commit: {
            sha: 'P1A5AxmsWdy1WPk0YRk48lVPDuYcy4EgUjtm2oGXt6LKdM6YS9',
          },
          contributors: [{
            name: 'Foo Bar',
            login: 'foobar@github',
            avatar: '',
          }],
        }, {
          key: '234',
          title: 'Add feature Y',
          branch: 'feature/baz',
          base: 'feature/foo',
          status: {
            qualityGateStatus: 'OK',
            bugs: 0,
            vulnerabilities: 0,
            codeSmells: 0,
          },
          analysisDate: '2017-02-01T02:15:42+0200',
          url: 'https://github.com/SonarSource/sonar-core-plugins/pull/42',
          target: 'feature/foo',
          commit: {
            sha: 'P1A5AxmsWdy1WPk0YRk48lVPDuYcy4EgUjtm2oGXt6LKdM6YS8',
          },
          contributors: [{
            name: 'Bar Baz',
            login: 'barbaz@github',
            avatar: '',
          }],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pr = new ProjectPullRequests(axiosInstance);
    const result = await pr.list(project);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, { params: { project } })).to.equal(true);
    stubGet.restore();
  });
});
