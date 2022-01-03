import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { SonarSearchStrategy, SonarSortFields } from '../../src/enums';
import { Components } from '../../src/resources';

describe('Components', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'components';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Components(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('show');
    expect(init).to.respondTo('tree');
  });

  it('should get correct search url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 1,
        },
        components: [
          {
            organization: 'my-org-1',
            key: 'project-key',
            qualifier: 'TRK',
            name: 'Project Name',
            project: 'project-key',
          },
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const search = new Components(axiosInstance);
    const result = await search.search(stubResult.data.components[0].organization);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        organization: stubResult.data.components[0].organization,
        p: 1,
        ps: 100,
        q: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct show url', async () => {
    const stubResult = {
      status: 200,
      data: {
        component: {
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown:src/main/java/com/sonarsource/markdown/impl/Rule.java',
          name: 'Rule.java',
          qualifier: 'FIL',
          language: 'java',
          path: 'src/main/java/com/sonarsource/markdown/impl/Rule.java',
          analysisDate: '2017-03-01T11:39:03+0100',
          leakPeriodDate: '2017-01-01T11:39:03+0100',
          version: '1.1',
        },
        ancestors: [{
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown:src/main/java/com/sonarsource/markdown/impl',
          name: 'src/main/java/com/sonarsource/markdown/impl',
          qualifier: 'DIR',
          path: 'src/main/java/com/sonarsource/markdown/impl',
          analysisDate: '2017-03-01T11:39:03+0100',
          version: '1.1',
        }, {
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown',
          name: 'Java Markdown',
          description: 'Java Markdown Project',
          qualifier: 'TRK',
          analysisDate: '2017-03-01T11:39:03+0100',
          version: '1.1',
          tags: ['language', 'plugin'],
          visibility: 'private',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const show = new Components(axiosInstance);
    const result = await show.show('my-org-1_com.sonarsource');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/show`, {
      params: {
        component: 'my-org-1_com.sonarsource',
        branch: undefined,
        pullRequest: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct tree url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 3,
        },
        baseComponent: {
          organization: 'my-org-1',
          key: 'MY_PROJECT_KEY',
          description: 'DESCRIPTION_MY_PROJECT_ID',
          qualifier: 'TRK',
          tags: [],
          visibility: 'private',
        },
        components: [{
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown:src/test/java/com/sonarsource/markdown/BasicMarkdownParser.java',
          name: 'BasicMarkdownParser.java',
          qualifier: 'UTS',
          path: 'src/test/java/com/sonarsource/markdown/BasicMarkdownParser.java',
          language: 'java',
        }, {
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown:src/test/java/com/sonarsource/markdown/BasicMarkdownParserTest.java',
          name: 'BasicMarkdownParserTest.java',
          qualifier: 'UTS',
          path: 'src/test/java/com/sonarsource/markdown/BasicMarkdownParserTest.java',
          language: 'java',
        }, {
          organization: 'my-org-1',
          key: 'com.sonarsource:java-markdown:src/main/java/com/sonarsource/markdown',
          name: 'src/main/java/com/sonarsource/markdown',
          qualifier: 'DIR',
          path: 'src/main/java/com/sonarsource/markdown',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const tree = new Components(axiosInstance);
    const result = await tree.tree('my-org-1_com.sonarsource');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/tree`, {
      params: {
        component: 'my-org-1_com.sonarsource',
        s: SonarSortFields.name,
        strategy: SonarSearchStrategy.all,
        asc: true,
        p: 1,
        ps: 100,
        branch: undefined,
        pullRequest: undefined,
        q: undefined,
        qualifiers: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
