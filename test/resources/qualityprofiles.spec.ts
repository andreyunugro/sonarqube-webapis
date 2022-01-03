import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  SonarInheritance, SonarIssuesSeverity, SonarLanguage, SonarOWASPTop10,
  SonarSANSTop25, SonarSelected, SonarSourceSecurity, SonarStatus, SonarType,
} from '../../src/enums';
import QualityProfiles from '../../src/resources/qualityprofiles';

describe('Quality Profiles', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'qualityprofiles';
  const keyTest = 'AU-Tpxb--iU5OvuD2FLy';
  const ruleTest = 'squid:AvoidCycles';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new QualityProfiles(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('activateRule');
    expect(init).to.respondTo('activateRules');
    expect(init).to.respondTo('addProject');
    expect(init).to.respondTo('backup');
    expect(init).to.respondTo('changeParent');
    expect(init).to.respondTo('changelog');
    expect(init).to.respondTo('copy');
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('deactivateRule');
    expect(init).to.respondTo('deactivateRules');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('export');
    expect(init).to.respondTo('exporters');
    expect(init).to.respondTo('importers');
    expect(init).to.respondTo('inheritance');
    expect(init).to.respondTo('projects');
    expect(init).to.respondTo('removeProject');
    expect(init).to.respondTo('rename');
    expect(init).to.respondTo('restore');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('setDefault');
  });

  it('should post correct activate rule', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.activateRule(keyTest, ruleTest);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/activate_rule`, `key=${keyTest}&rule=${ruleTest.replace(':', '%3A')}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct activate rules', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.activateRules(keyTest);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/activate_rules`, `targetKey=${keyTest}&asc=true`)).to.equal(true);
    const nextResult = await qp.activateRules(keyTest, undefined, [SonarIssuesSeverity.info], undefined, ['12', '125', 'unknown'], [SonarInheritance.none], undefined, ['java', 'js'], undefined, [SonarOWASPTop10.a1], undefined, undefined, ['checkstyle', 'findbugs'], undefined, undefined, [SonarSANSTop25.porousDefenses], [SonarIssuesSeverity.major], [SonarSourceSecurity.dos], [SonarStatus.removed], ['security', 'java8'], undefined, undefined, [SonarType.vulnerability]);
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/activate_rules`, `targetKey=${keyTest}&active_severities=${SonarIssuesSeverity.info}&cwe=12%2C125%2Cunknown&inheritance=${SonarInheritance.none}&languages=java%2Cjs&owaspTop10=${SonarOWASPTop10.a1}&repositories=checkstyle%2Cfindbugs&sansTop25=${SonarSANSTop25.porousDefenses}&severities=${SonarIssuesSeverity.major}&sonarsourceSecurity=${SonarSourceSecurity.dos}&statuses=${SonarStatus.removed}&tags=security%2Cjava8&types=${SonarType.vulnerability}&asc=true`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct add project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.addProject();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_project`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct backup url', async () => {
    const stubResult = {
      status: 200, data: `<?xml version="1.0" encoding="UTF-8"?>
    <profile>
      <name>Sonar way</name>
      <language>c</language>
      <rules>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>AssignmentInSubExpression</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>BackJumpWithGoto</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>CommentedCode</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>ContinueUsage</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>DigraphUsage</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>ElseIfWithoutElse</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>EmptyCompoundStatement</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>EnumPartialInitialization</key>
          <priority>MAJOR</priority>
          <parameters/>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>FileComplexity</key>
          <priority>MAJOR</priority>
          <parameters>
            <parameter>
              <key>maximumFileComplexityThreshold</key>
              <value>80</value>
            </parameter>
          </parameters>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>FileLoc</key>
          <priority>MAJOR</priority>
          <parameters>
            <parameter>
              <key>maximumFileLocThreshold</key>
              <value>1000</value>
            </parameter>
          </parameters>
        </rule>
        <rule>
          <repositoryKey>c</repositoryKey>
          <key>FunctionComplexity</key>
          <priority>MAJOR</priority>
          <parameters>
            <parameter>
              <key>maximumFunctionComplexityThreshold</key>
              <value>20</value>
            </parameter>
          </parameters>
        </rule>
      </rules>
    </profile>`,
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.backup();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/backup`, {
      params: {
        language: undefined,
        organization: undefined,
        qualityProfile: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct change parent', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.changeParent();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/change_parent`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct changelog url', async () => {
    const stubResult = {
      status: 200,
      data: {
        total: 3,
        ps: 10,
        p: 1,
        events: [{
          date: '2015-02-23T17:58:39+0100',
          action: 'ACTIVATED',
          authorLogin: 'anakin.skywalker',
          authorName: 'Anakin Skywalker',
          ruleKey: 'squid:S2438',
          ruleName: '"Threads" should not be used where "Runnables" are expected',
          params: {
            severity: 'CRITICAL',
          },
        }, {
          date: '2015-02-23T17:58:18+0100',
          action: 'DEACTIVATED',
          authorLogin: 'padme.amidala',
          authorName: 'Padme Amidala',
          ruleKey: 'squid:S2162',
          ruleName: '"equals" methods should be symmetric and work for subclasses',
        }, {
          action: 'ACTIVATED',
          authorLogin: 'obiwan.kenobi',
          authorName: 'Obiwan Kenobi',
          ruleKey: 'squid:S00101',
          ruleName: 'Class names should comply with a naming convention',
          date: '2014-09-12T15:20:46+0200',
          params: {
            severity: 'MAJOR',
            format: '^[A-Z][a-zA-Z0-9]*$',
          },
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.changelog();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/changelog`, {
      params: {
        language: undefined,
        organization: undefined,
        qualityProfile: undefined,
        since: undefined,
        to: undefined,
        p: 1,
        ps: 50,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct copy profile', async () => {
    const stubResult = {
      status: 200,
      data: {
        key: 'AU-TpxcA-iU5OvuD2FL1',
        name: 'My New Profile',
        language: 'Java',
        isDefault: false,
        isInherited: true,
        parentKey: 'AU-TpxcA-iU5OvuD2FL2',
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.copy(stubResult.data.key, 'My Sonar Way');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/copy`, `fromKey=${stubResult.data.key}&toName=My+Sonar+Way`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct create profile', async () => {
    const stubResult = {
      status: 200,
      data: {
        profile: {
          isDefault: false,
          isInherited: false,
          language: 'java',
          languageName: 'Java',
          name: 'My New Profile',
          key: 'AU-TpxcA-iU5OvuD2FL1',
        },
        warnings: [
          "Unable to import unknown PMD rule 'rulesets/java/strings.xml'",
          "Unable to import unknown PMD rule 'rulesets/java/basic.xml/UnnecessaryConversionTemporary'",
          "Unable to import unknown PMD rule 'rulesets/java/basic.xml/EmptyCatchBlock'",
          "Unable to import unknown PMD rule 'rulesets/java/braces.xml'",
        ],
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.create(stubResult.data.profile.language as SonarLanguage.java, stubResult.data.profile.name, 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, `language=${stubResult.data.profile.language}&name=${stubResult.data.profile.name.replace(/\s/g, '+')}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct deactivate rule', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.deactivateRule(keyTest, ruleTest);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/deactivate_rule`, `key=${keyTest}&rule=${ruleTest.replace(':', '%3A')}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct deactivate rules', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.deactivateRules(keyTest);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/deactivate_rules`, `targetKey=${keyTest}&asc=true`)).to.equal(true);
    const nextResult = await qp.deactivateRules(keyTest, undefined, [SonarIssuesSeverity.info], undefined, ['12', '125', 'unknown'], [SonarInheritance.none], undefined, ['java', 'js'], undefined, [SonarOWASPTop10.a1], undefined, undefined, ['checkstyle', 'findbugs'], undefined, undefined, [SonarSANSTop25.porousDefenses], [SonarIssuesSeverity.major], [SonarSourceSecurity.dos], [SonarStatus.removed], ['security', 'java8'], undefined, [SonarType.vulnerability]);
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/deactivate_rules`, `targetKey=${keyTest}&active_severities=${SonarIssuesSeverity.info}&cwe=12%2C125%2Cunknown&inheritance=${SonarInheritance.none}&languages=java%2Cjs&owaspTop10=${SonarOWASPTop10.a1}&repositories=checkstyle%2Cfindbugs&sansTop25=${SonarSANSTop25.porousDefenses}&severities=${SonarIssuesSeverity.major}&sonarsourceSecurity=${SonarSourceSecurity.dos}&statuses=${SonarStatus.removed}&tags=security%2Cjava8&types=${SonarType.vulnerability}&asc=true`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete profile', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.delete();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct export url', async () => {
    const stubResult = {
      status: 200, data: `<?xml version="1.0" encoding="utf-8"?>
      <RuleSet Name="Rules for SonarLint" Description="This rule set was automatically generated from SonarQube."
               ToolsVersion="14.0">
        <Rules AnalyzerId="SonarLint" RuleNamespace="SonarLint">
          <Rule Id="S2330" Action="None"/>
          <Rule Id="S1227" Action="None"/>
          <Rule Id="S2197" Action="None"/>
          <Rule Id="S126" Action="None"/>
          <Rule Id="S1694" Action="None"/>
          <Rule Id="S2357" Action="None"/>
          <Rule Id="S1109" Action="None"/>
          <Rule Id="S1301" Action="None"/>
          <Rule Id="S2278" Action="None"/>
          <Rule Id="S121" Action="None"/>
          <Rule Id="S2760" Action="None"/>
          <Rule Id="S2070" Action="None"/>
          <Rule Id="S105" Action="None"/>
        </Rules>
      </RuleSet>`,
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.export('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/export`, {
      params: {
        organization: 'my-org',
        exporterKey: undefined,
        language: undefined,
        qualityProfile: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct exporters url', async () => {
    const stubResult = {
      status: 200,
      data: {
        exporters: [{
          key: 'pmd',
          name: 'PMD',
          languages: ['java'],
        }, {
          key: 'checkstyle',
          name: 'Checkstyle',
          languages: ['java'],
        }, {
          key: 'js-lint',
          name: 'JS Lint',
          languages: ['js'],
        }, {
          key: 'android-lint',
          name: 'Android Lint',
          languages: ['xml', 'java'],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.exporters();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/exporters`)).to.equal(true);
    stubGet.restore();
  });

  it('should get correct importers url', async () => {
    const stubResult = {
      status: 200,
      data: {
        importers: [{
          key: 'pmd',
          name: 'PMD',
          languages: ['java'],
        }, {
          key: 'checkstyle',
          name: 'Checkstyle',
          languages: ['java'],
        }, {
          key: 'js-lint',
          name: 'JS Lint',
          languages: ['js'],
        }, {
          key: 'android-lint',
          name: 'Android Lint',
          languages: ['xml', 'java'],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.importers();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/importers`)).to.equal(true);
    stubGet.restore();
  });

  it('should get correct inheritance url', async () => {
    const stubResult = {
      status: 200,
      data: {
        profile: {
          key: 'AU-TpxcA-iU5OvuD2FL5',
          name: 'My BU Profile',
          parent: 'AU-TpxcA-iU5OvuD2FL2',
          activeRuleCount: 3,
          overridingRuleCount: 1,
          isBuiltIn: false,
        },
        ancestors: [{
          key: 'AU-TpxcA-iU5OvuD2FL1',
          name: 'My Company Profile',
          parent: 'xoo-my-group-profile-01234',
          activeRuleCount: 3,
          isBuiltIn: false,
        }, {
          key: 'AU-TpxcA-iU5OvuD2FL0',
          name: 'Sonar way',
          activeRuleCount: 2,
          isBuiltIn: true,
        }],
        children: [{
          key: 'AU-TpxcB-iU5OvuD2FL6',
          name: 'For Project One',
          activeRuleCount: 5,
          isBuiltIn: false,
        }, {
          key: 'AU-TpxcB-iU5OvuD2FL7',
          name: 'For Project Two',
          activeRuleCount: 4,
          overridingRuleCount: 1,
          isBuiltIn: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.inheritance();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/inheritance`, {
      params: {
        language: undefined,
        organization: undefined,
        qualityProfile: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct projects url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 4,
        },
        results: [{
          id: '5eab015a-1f76-4ba4-bd89-bf547132d673',
          key: 'org.sonarsource.javascript:javascript',
          name: 'JavaScript Plugin',
          selected: true,
        }, {
          id: 'f1ab623e-d00d-401b-bf9e-c45e91976bf0',
          key: 'org.jenkins-ci.plugins:sonar',
          name: 'Jenkins SonarQube Plugin',
          selected: false,
        }, {
          id: '69e57151-be0d-4157-adff-c06741d88879',
          key: 'org.sonarsource.sonarqube:sonarqube',
          name: 'SonarQube',
          selected: false,
        }, {
          id: 'c355a0fe-9b77-4d39-9837-8364a41ce10d',
          key: 'org.sonarsource.android:sonar-android',
          name: 'SonarQube Android Plugin',
          selected: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.projects(keyTest);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/projects`, {
      params: {
        key: keyTest,
        q: undefined,
        p: 1,
        ps: 100,
        selected: SonarSelected.selected,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct remove project', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.removeProject();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_project`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct rename profile', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.rename(keyTest, 'My Sonar Way');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/rename`, `key=${keyTest}&name=My+Sonar+Way`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct restore profile', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.restore('xml', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/restore`, 'backup=xml&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search url', async () => {
    const stubResult = {
      status: 200,
      data: {
        profiles: [{
          key: 'AU-TpxcA-iU5OvuD2FL3',
          name: 'Sonar way',
          language: 'cs',
          languageName: 'C#',
          isInherited: false,
          isBuiltIn: true,
          activeRuleCount: 3,
          activeDeprecatedRuleCount: 0,
          isDefault: true,
          ruleUpdatedAt: '2016-12-22T19:10:03+0100',
          lastUsed: '2016-12-01T19:10:03+0100',
          actions: {
            edit: false,
            setAsDefault: false,
            copy: false,
            delete: false,
            associateProjects: false,
          },
        }, {
          key: 'AU-TpxcA-iU5OvuD2FL1',
          name: 'My BU Profile',
          language: 'java',
          languageName: 'Java',
          isInherited: true,
          isBuiltIn: false,
          parentKey: 'iU5OvuD2FLz',
          parentName: 'My Company Profile',
          activeRuleCount: 15,
          activeDeprecatedRuleCount: 5,
          isDefault: false,
          projectCount: 7,
          ruleUpdatedAt: '2016-12-20T19:10:03+0100',
          lastUsed: '2016-12-21T16:10:03+0100',
          userUpdatedAt: '2016-06-28T21:57:01+0200',
          actions: {
            edit: true,
            setAsDefault: false,
            copy: false,
            delete: true,
            associateProjects: true,
          },
        }, {
          key: 'iU5OvuD2FLz',
          name: 'My Company Profile',
          language: 'java',
          languageName: 'Java',
          isInherited: false,
          isDefault: true,
          isBuiltIn: false,
          activeRuleCount: 9,
          activeDeprecatedRuleCount: 2,
          ruleUpdatedAt: '2016-12-22T19:10:03+0100',
          userUpdatedAt: '2016-06-29T21:57:01+0200',
          actions: {
            edit: true,
            setAsDefault: false,
            copy: false,
            delete: false,
            associateProjects: false,
          },
        }, {
          key: 'AU-TpxcB-iU5OvuD2FL7',
          name: 'Sonar way',
          language: 'py',
          languageName: 'Python',
          isInherited: false,
          isBuiltIn: true,
          activeRuleCount: 2,
          activeDeprecatedRuleCount: 0,
          isDefault: true,
          ruleUpdatedAt: '2014-12-22T19:10:03+0100',
          actions: {
            edit: false,
            setAsDefault: false,
            copy: false,
            delete: false,
            associateProjects: false,
          },
        }],
        actions: {
          create: false,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.search('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        organization: 'my-org',
        language: undefined,
        project: undefined,
        qualityProfile: undefined,
        defaults: false,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct set default profile', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qp = new QualityProfiles(axiosInstance);
    const result = await qp.setDefault();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_default`, '')).to.equal(true);
    stubPost.restore();
  });
});
