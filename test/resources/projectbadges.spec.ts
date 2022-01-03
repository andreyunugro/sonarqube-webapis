import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectBadges, { ProjectBadgesMetric } from '../../src/resources/projectbadges';

describe('Project Badges', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_badges';
  const project = 'my_project';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectBadges(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('measure');
    expect(init).to.respondTo('qualityGate');
  });

  it('should get correct measure url', async () => {
    const stubResult = { status: 200, data: 'svg' };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pb = new ProjectBadges(axiosInstance);
    const result = await pb.measure(project, ProjectBadgesMetric.bugs);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/measure`, {
      params: {
        project,
        metric: ProjectBadgesMetric.bugs,
        branch: undefined,
        token: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct quality gate url', async () => {
    const stubResult = { status: 200, data: 'svg' };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pb = new ProjectBadges(axiosInstance);
    const result = await pb.qualityGate(project);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/quality_gate`, {
      params: {
        project,
        branch: undefined,
        token: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
