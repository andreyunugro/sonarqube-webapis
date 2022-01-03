import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { SonarMetricKey, SonarSelected } from '../../src/enums';
import QualityGates from '../../src/resources/qualitygates';

describe('Quality Gates', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'qualitygates';
  const name = 'My Quality Gate';
  const namePost = name.replace(/\s/g, '+');

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new QualityGates(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('copy');
    expect(init).to.respondTo('create');
    expect(init).to.respondTo('createCondition');
    expect(init).to.respondTo('deleteCondition');
    expect(init).to.respondTo('deselect');
    expect(init).to.respondTo('destroy');
    expect(init).to.respondTo('getByProject');
    expect(init).to.respondTo('list');
    expect(init).to.respondTo('projectStatus');
    expect(init).to.respondTo('rename');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('select');
    expect(init).to.respondTo('setAsDefault');
    expect(init).to.respondTo('show');
    expect(init).to.respondTo('updateCondition');
  });

  it('should post correct copy quality gate', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.copy('1', name, 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/copy`, `id=1&name=${namePost}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct crete quality gate', async () => {
    const stubResult = {
      status: 200,
      data: {
        id: 1,
        name: 'My Quality Gate',
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.create(name, 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create`, `name=${namePost}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct create condition', async () => {
    const stubResult = {
      status: 200,
      data: {
        id: 1,
        metric: 'blocker_violations',
        op: 'LT',
        error: '10',
        warning: '5',
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.createCondition(10, '1', [SonarMetricKey.vulnerabilities, SonarMetricKey.newCodeSmells], 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create_condition`, `error=10&gateId=1&metric=${SonarMetricKey.vulnerabilities}%2C${SonarMetricKey.newCodeSmells}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete condition', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.deleteCondition('1', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete_condition`, 'id=1&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct deselect', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.deselect('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/deselect`, 'organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct destroy quality gate', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.destroy('1', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/destroy`, 'id=1&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct get by project url', async () => {
    const stubResult = {
      status: 200,
      data: {
        qualityGate: {
          id: '23',
          name: 'My team QG',
          default: false,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.getByProject('my-org', 'my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/get_by_project`, {
      params: {
        organization: 'my-org',
        project: 'my_project',
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct list quality gate', async () => {
    const stubResult = {
      status: 200,
      data: {
        qualitygates: [{
          id: 8,
          name: 'Sonar way',
          isDefault: true,
          isBuiltIn: true,
          actions: {
            rename: false,
            setAsDefault: false,
            copy: true,
            associateProjects: false,
            delete: false,
            manageConditions: false,
          },
          conditions: [{
            id: 1,
            metric: 'blocker_violations',
            op: 'GT',
            error: '0',
          }, {
            id: 2,
            metric: 'tests',
            op: 'LT',
            error: '10',
          }],
        }, {
          id: 9,
          name: 'Sonar way - Without Coverage',
          isDefault: false,
          isBuiltIn: false,
          actions: {
            rename: true,
            setAsDefault: true,
            copy: true,
            associateProjects: true,
            delete: true,
            manageConditions: true,
          },
          conditions: [],
        }],
        default: 8,
        actions: {
          create: true,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.list('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`, {
      params: { organization: 'my-org' },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct project status', async () => {
    const stubResult = {
      status: 200,
      data: {
        projectStatus: {
          status: 'ERROR',
          ignoredConditions: false,
          conditions: [{
            status: 'ERROR',
            metricKey: 'new_coverage',
            comparator: 'LT',
            periodIndex: 1,
            errorThreshold: '85',
            actualValue: '82.50562381034781',
          }, {
            status: 'ERROR',
            metricKey: 'new_blocker_violations',
            comparator: 'GT',
            periodIndex: 1,
            errorThreshold: '0',
            actualValue: '14',
          }, {
            status: 'ERROR',
            metricKey: 'new_critical_violations',
            comparator: 'GT',
            periodIndex: 1,
            errorThreshold: '0',
            actualValue: '1',
          }, {
            status: 'OK',
            metricKey: 'new_sqale_debt_ratio',
            comparator: 'GT',
            periodIndex: 1,
            errorThreshold: '5',
            actualValue: '0.6562109862671661',
          }, {
            status: 'OK',
            metricKey: 'reopened_issues',
            comparator: 'GT',
            periodIndex: 1,
            actualValue: '0',
          }, {
            status: 'ERROR',
            metricKey: 'open_issues',
            comparator: 'GT',
            periodIndex: 1,
            actualValue: '17',
          }, {
            status: 'OK',
            metricKey: 'skipped_tests',
            comparator: 'GT',
            periodIndex: 1,
            actualValue: '0',
          }],
          periods: [{
            index: 1,
            mode: 'last_version',
            date: '2000-04-27T00:45:23+0200',
            parameter: '2015-12-07',
          }],
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.projectStatus();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/project_status`, {
      params: {
        analysisId: undefined,
        branch: undefined,
        projectId: undefined,
        projectKey: undefined,
        pullRequest: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct rename quality gate', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.rename('1', name, 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/rename`, `id=1&name=${namePost}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct project status', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 2,
        },
        results: [{
          id: 1,
          name: 'Simple Java project analyzed with the SonarQube Runner',
          key: 'somple-java',
          selected: true,
        }, {
          id: 4,
          name: 'My Project',
          key: 'my-project',
          selected: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.search('1', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        gateId: '1',
        organization: 'my-org',
        pageSize: undefined,
        query: undefined,
        page: 1,
        selected: SonarSelected.selected,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct select', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.select('1', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/select`, 'gateId=1&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct set as default', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.setAsDefault('1', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_as_default`, 'id=1&organization=my-org')).to.equal(true);
    stubPost.restore();
  });

  it('should get correct show quality gate', async () => {
    const stubResult = {
      status: 200,
      data: {
        id: 5,
        name: 'My Quality Gate',
        conditions: [{
          id: 2,
          metric: 'blocker_violations',
          op: 'GT',
          error: '0',
        }, {
          id: 3,
          metric: 'tests',
          op: 'LT',
          error: '10',
        }],
        isBuiltIn: false,
        actions: {
          rename: true,
          setAsDefault: true,
          copy: true,
          associateProjects: true,
          delete: true,
          manageConditions: true,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.show('my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/show`, {
      params: {
        organization: 'my-org',
        id: undefined,
        name: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct update condition', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const qg = new QualityGates(axiosInstance);
    const result = await qg.updateCondition(10, '10', [SonarMetricKey.vulnerabilities, SonarMetricKey.newCodeSmells], 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update_condition`, `error=10&id=10&metric=${SonarMetricKey.vulnerabilities}%2C${SonarMetricKey.newCodeSmells}&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });
});
