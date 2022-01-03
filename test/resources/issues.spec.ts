import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Issues, {
  IssuesTransition, IssuesFacet, IssuesResolution, IssuesStatus,
} from '../../src/resources/issues';
import {
  SonarIssuesSeverity, SonarOWASPTop10, SonarSANSTop25,
  SonarSourceSecurity, SonarType,
} from '../../src/enums';

describe('Issues', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'issues';
  const issueKey = 'AU-Tpxb--iU5OvuD2FLy';
  const issueData = {
    issue: {
      key: 'AVibidgv1LF0E-ru2DVv',
      rule: 'squid:S2301',
      severity: 'MAJOR',
      component: 'org.sonarsource.sonarlint.intellij:sonarlint-intellij:src/main/java/org/sonarlint/intellij/core/ServerIssueUpdater.java',
      project: 'org.sonarsource.sonarlint.intellij:sonarlint-intellij',
      line: 78,
      textRange: {
        startLine: 78,
        endLine: 78,
        startOffset: 14,
        endOffset: 39,
      },
      flows: [],
      status: 'CONFIRMED',
      message: 'Provide multiple methods instead of using "modal" to determine which action to take.',
      effort: '15min',
      debt: '15min',
      assignee: 'john.smith',
      author: 'john.smith@email.com',
      tags: [
        'design',
      ],
      transitions: ['unconfirm', 'resolve', 'falsepositive', 'wontfix'],
      actions: ['comment', 'assign', 'set_tags', 'set_type', 'set_severity'],
      comments: [{
        key: 'AVmDRx8Zm-z8OYZYRSxo',
        login: 'jane.doo',
        htmlText: 'Please fix this',
        markdown: 'Please fix this',
        updatable: true,
        createdAt: '2017-01-09T13:49:53+0100',
      }],
      creationDate: '2016-11-25T13:50:24+0100',
      updateDate: '2017-01-09T13:51:12+0100',
      type: 'CODE_SMELL',
    },
    components: [{
      key: 'org.sonarsource.sonarlint.intellij:sonarlint-intellij:src/main/java/org/sonarlint/intellij/core/ServerIssueUpdater.java',
      uuid: 'AVfTIlxMwczdZ2UaLhnt',
      enabled: true,
      qualifier: 'FIL',
      name: 'ServerIssueUpdater.java',
      longName: 'src/main/java/org/sonarlint/intellij/core/ServerIssueUpdater.java',
      path: 'src/main/java/org/sonarlint/intellij/core/ServerIssueUpdater.java',
    }, {
      id: 23498,
      key: 'org.sonarsource.sonarlint.intellij:sonarlint-intellij',
      uuid: '8b745480-b598-4e34-af4a-cb2de1808e50',
      enabled: true,
      qualifier: 'TRK',
      name: 'SonarLint for IntelliJ IDEA',
      longName: 'SonarLint for IntelliJ IDEA',
    }],
    rules: [{
      key: 'squid:S2301',
      name: 'Public methods should not contain selector arguments',
      lang: 'java',
      status: 'READY',
      langName: 'Java',
    }],
    users: [{
      login: 'john.smith',
      name: 'John Smith',
      email: 'john.smith@email.com',
      active: true,
    }, {
      login: 'jane.doo',
      name: 'Jane Doo',
      email: 'jane.doo@mail.net',
      active: true,
    }],
  };

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Issues(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('addComment');
    expect(init).to.respondTo('assign');
    expect(init).to.respondTo('authors');
    expect(init).to.respondTo('bulkChange');
    expect(init).to.respondTo('changelog');
    expect(init).to.respondTo('deleteComment');
    expect(init).to.respondTo('doTransition');
    expect(init).to.respondTo('editComment');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('setSeverity');
    expect(init).to.respondTo('setTags');
    expect(init).to.respondTo('setType');
    expect(init).to.respondTo('tags');
  });

  it('should post correct add comment', async () => {
    const text = 'Wont fix because it doesnt apply to the context';
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.addComment(issueKey, text);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_comment`, `issue=${issueKey}&text=${text.replace(/\s/g, '+')}&isFeedback=false`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct assign', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.assign(issueKey);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/assign`, `issue=${issueKey}`)).to.equal(true);

    const result2 = await issue.assign(issueKey, 'admin');
    expect(result2).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/assign`, `issue=${issueKey}&assignee=admin`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct author url', async () => {
    const stubResult = {
      status: 200,
      data: {
        authors: ['luke.skywalker', 'leia.organa'],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.authors('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/authors`, {
      params: {
        organization: 'my-org',
        project: undefined,
        q: undefined,
        ps: 10,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should able to do bulk change on issues', async () => {
    const stubResult = {
      status: 200,
      data: {
        total: 2,
        success: 1,
        ignored: 1,
        failures: 0,
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.bulkChange([issueKey]);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/bulk_change`, `issues=${issueKey}&sendNotifications=false`)).to.equal(true);
    stubPost.restore();
  });

  it('should get changelog of an issue', async () => {
    const stubResult = {
      status: 200,
      data: {
        changelog: [{
          user: 'john.smith',
          userName: 'John Smith',
          isUserActive: true,
          avatar: 'b0d8c6e5ea589e6fc3d3e08afb1873bb',
          creationDate: '2014-03-04T23:03:44+0100',
          diffs: [{
            key: 'severity',
            newValue: 'BLOCKER',
            oldValue: 'MAJOR',
          }],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.changelog(issueKey);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/changelog`, {
      params: { issue: issueKey },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post delete comment', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.deleteComment(issueKey);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete_comment`, `comment=${issueKey}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post do transition', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.doTransition(issueKey, IssuesTransition.close);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/do_transition`, `issue=${issueKey}&transition=${IssuesTransition.close}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct edit comment', async () => {
    const text = 'Wont fix because it doesnt apply to the context';
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.editComment(issueKey, text);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/edit_comment`, `comment=${issueKey}&text=${text.replace(/\s/g, '+')}`)).to.equal(true);
    stubPost.restore();
  });

  it('should search for issue', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 1,
        },
        issues: [{
          key: '01fc972e-2a3c-433e-bcae-0bd7f88f5123',
          component: 'com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest',
          project: 'com.github.kevinsawicki:http-request',
          rule: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck',
          status: 'RESOLVED',
          resolution: 'FALSE-POSITIVE',
          severity: 'MINOR',
          message: "'3' is a magic number.",
          line: 81,
          hash: 'a227e508d6646b55a086ee11d63b21e9',
          author: 'Developer 1',
          effort: '2h1min',
          creationDate: '2013-05-13T17:55:39+0200',
          updateDate: '2013-05-13T17:55:39+0200',
          tags: ['bug'],
          type: 'RELIABILITY',
          comments: [{
            key: '7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba',
            login: 'john.smith',
            htmlText: 'Must be &quot;final&quot;!',
            markdown: 'Must be "final"!',
            updatable: false,
            createdAt: '2013-05-13T18:08:34+0200',
          }],
          attr: {
            'jira-issue-key': 'SONAR-1234',
          },
          transitions: ['unconfirm', 'resolve', 'falsepositive'],
          actions: ['comment'],
          textRange: {
            startLine: 2,
            endLine: 2,
            startOffset: 0,
            endOffset: 204,
          },
          flows: [{
            locations: [{
              textRange: {
                startLine: 16,
                endLine: 16,
                startOffset: 0,
                endOffset: 30,
              },
              msg: 'Expected position: 5',
            }],
          }, {
            locations: [{
              textRange: {
                startLine: 15,
                endLine: 15,
                startOffset: 0,
                endOffset: 37,
              },
              msg: 'Expected position: 6',
            }],
          }],
        }],
        components: [{
          key: 'com.github.kevinsawicki:http-request:src/main/java/com/github/kevinsawicki/http/HttpRequest.java',
          enabled: true,
          qualifier: 'FIL',
          name: 'HttpRequest.java',
          longName: 'src/main/java/com/github/kevinsawicki/http/HttpRequest.java',
          path: 'src/main/java/com/github/kevinsawicki/http/HttpRequest.java',
        }, {
          key: 'com.github.kevinsawicki:http-request',
          enabled: true,
          qualifier: 'TRK',
          name: 'http-request',
          longName: 'http-request',
        }],
        rules: [{
          key: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck',
          name: 'Magic Number',
          status: 'READY',
          lang: 'java',
          langName: 'Java',
        }],
        users: [{
          login: 'admin',
          name: 'Administrator',
          active: true,
          avatar: 'ab0ec6adc38ad44a15105f207394946f',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    // Minimal search parameter.
    const result = await issue.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        asc: true,
        onComponentOnly: false,
        p: 1,
        ps: 100,
        sinceLeakPeriod: false,
      },
    })).to.equal(true);
    // Multiple params process.
    const nextResult = await issue.search(
      [issueKey],
      undefined,
      undefined,
      undefined,
      ['admin'],
      undefined,
      undefined,
      ['my_project'],
      undefined,
      undefined,
      undefined,
      undefined,
      ['12', '125', 'unknown'],
      [IssuesFacet.projects],
      ['java'],
      [SonarOWASPTop10.a1],
      undefined,
      [IssuesResolution.fixed],
      undefined,
      ['squid:AvoidCycles'],
      undefined,
      [SonarSANSTop25.porousDefenses],
      [SonarIssuesSeverity.info],
      [SonarSourceSecurity.dos],
      [IssuesStatus.open],
      ['security'],
      [SonarType.bug],
    );
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubGet.calledWith(`${path}/search`, {
      params: {
        issues: issueKey,
        assignees: 'admin',
        componentKeys: 'my_project',
        cwe: '12,125,unknown',
        facets: IssuesFacet.projects,
        languages: 'java',
        owaspTop10: SonarOWASPTop10.a1,
        resolutions: IssuesResolution.fixed,
        rules: 'squid:AvoidCycles',
        sansTop25: SonarSANSTop25.porousDefenses,
        severities: SonarIssuesSeverity.info,
        sonarsourceSecurity: SonarSourceSecurity.dos,
        statuses: IssuesStatus.open,
        tags: 'security',
        types: SonarType.bug,
        asc: true,
        onComponentOnly: false,
        p: 1,
        ps: 100,
        sinceLeakPeriod: false,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct set severity', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.setSeverity(issueKey, SonarIssuesSeverity.info);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_severity`, `issue=${issueKey}&severity=${SonarIssuesSeverity.info}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct set tags', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.setTags(issueKey, ['security', 'cwe']);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_tags`, `issue=${issueKey}&tags=security%2Ccwe`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct set type', async () => {
    const stubResult = { status: 200, data: issueData };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.setType(issueKey, SonarType.bug);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_type`, `issue=${issueKey}&type=${SonarType.bug}`)).to.equal(true);
    stubPost.restore();
  });

  it('should get list of tag', async () => {
    const stubResult = {
      status: 200,
      data: {
        tags: ['convetion', 'security', 'cwe'],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const issue = new Issues(axiosInstance);
    const result = await issue.tags();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/tags`, {
      params: {
        organization: undefined,
        project: undefined,
        q: undefined,
        ps: 10,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
