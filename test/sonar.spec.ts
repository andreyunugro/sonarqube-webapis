import { expect } from 'chai';
import Sonar from '../src/sonar';

describe('Sonar', () => {
  it('should have valid properties', () => {
    const config = {
      auth: {
        username: '',
        password: '',
      },
      baseURL: 'http://127.0.0.1/api',
    };
    const sonar = new Sonar(config);
    expect(sonar).to.have.property('instance');
    expect(sonar.instance).to.have.property('defaults');
    expect(sonar.instance.defaults).to.have.property('auth');
    expect(sonar.instance.defaults.auth).to.deep.equal(config.auth);
    expect(sonar.instance.defaults).to.have.property('baseURL', config.baseURL);
    expect(sonar).to.have.property('authentication');
    expect(sonar).to.have.property('ce');
    expect(sonar).to.have.property('components');
    expect(sonar).to.have.property('duplications');
    expect(sonar).to.have.property('favorites');
    expect(sonar).to.have.property('issues');
    expect(sonar).to.have.property('languages');
    expect(sonar).to.have.property('measures');
    expect(sonar).to.have.property('metrics');
    expect(sonar).to.have.property('notifications');
    expect(sonar).to.have.property('permissions');
    expect(sonar).to.have.property('projectAnalyses');
    expect(sonar).to.have.property('projectBadges');
    expect(sonar).to.have.property('projectBranches');
    expect(sonar).to.have.property('projectLinks');
    expect(sonar).to.have.property('projectPullRequests');
    expect(sonar).to.have.property('projectTags');
    expect(sonar).to.have.property('projects');
    expect(sonar).to.have.property('qualityGates');
    expect(sonar).to.have.property('qualityProfiles');
    expect(sonar).to.have.property('rules');
    expect(sonar).to.have.property('settings');
    expect(sonar).to.have.property('sources');
    expect(sonar).to.have.property('userGroups');
    expect(sonar).to.have.property('userTokens');
    expect(sonar).to.have.property('users');
    expect(sonar).to.have.property('webhooks');
    expect(sonar).to.have.property('webServices');
  });
});
