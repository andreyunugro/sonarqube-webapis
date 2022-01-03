import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Duplications from '../../src/resources/duplications';

describe('Duplications', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'duplications';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Duplications(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('show');
  });

  it('should get correct show url', async () => {
    const stubResult = {
      status: 200,
      data: {
        duplications: [{
          blocks: [{
            from: 94,
            size: 101,
            _ref: '1',
          },
          {
            from: 83,
            size: 101,
            _ref: '2',
          }],
        }, {
          blocks: [{
            from: 38,
            size: 40,
            _ref: '1',
          }, {
            from: 29,
            size: 39,
            _ref: '2',
          }],
        }, {
          blocks: [{
            from: 148,
            size: 24,
            _ref: '1',
          },
          {
            from: 137,
            size: 24,
            _ref: '2',
          },
          {
            from: 137,
            size: 24,
            _ref: '3',
          }],
        }],
        files: {
          1: {
            key: 'org.codehaus.sonar:sonar-plugin-api:src/main/java/org/sonar/api/utils/command/CommandExecutor.java',
            name: 'CommandExecutor',
            projectName: 'SonarQube',
          },
          2: {
            key: 'com.sonarsource.orchestrator:sonar-orchestrator:src/main/java/com/sonar/orchestrator/util/CommandExecutor.java',
            name: 'CommandExecutor',
            projectName: 'SonarSource :: Orchestrator',
          },
          3: {
            key: 'org.codehaus.sonar.runner:sonar-runner-api:src/main/java/org/sonar/runner/api/CommandExecutor.java',
            name: 'CommandExecutor',
            projectName: 'SonarSource Runner',
          },
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const duplications = new Duplications(axiosInstance);
    const result = await duplications.show('org.codehaus.sonar:sonar-plugin-api:src/main/java/org/sonar/api/utils/command/CommandExecutor.java');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/show`, {
      params: {
        key: 'org.codehaus.sonar:sonar-plugin-api:src/main/java/org/sonar/api/utils/command/CommandExecutor.java',
        branch: undefined,
        pullRequest: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
