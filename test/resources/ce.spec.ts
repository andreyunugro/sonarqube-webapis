import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import CE, { CEStatus, CEAdditionalFields } from '../../src/resources/ce';

describe('CE', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'ce';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new CE(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('activity');
    expect(init).to.respondTo('activityStatus');
    expect(init).to.respondTo('component');
    expect(init).to.respondTo('task');
  });

  it('should get correct activity url', async () => {
    const stubResult = {
      status: 200,
      data: {
        tasks: [{
          organization: 'my-org-1',
          id: 'BU_dO1vsORa8_beWCwsP',
          type: 'REPORT',
          componentId: 'AU-Tpxb--iU5OvuD2FLy',
          componentKey: 'project_1',
          componentName: 'Project One',
          componentQualifier: 'TRK',
          analysisId: 'AU-TpxcB-iU5Ovu12345',
          status: 'SUCCESS',
          submittedAt: '2015-08-13T23:34:59+0200',
          submitterLogin: 'john',
          startedAt: '2015-08-13T23:35:00+0200',
          executedAt: '2015-08-13T23:35:10+0200',
          executionTimeMs: 10000,
          logs: false,
          hasErrorStacktrace: false,
          hasScannerContext: true,
        }, {
          organization: 'my-org-2',
          id: 'AU_dO1vsORa8_beWCwmP',
          taskType: 'REPORT',
          componentId: 'AU_dO1vlORa8_beWCwmO',
          componentKey: 'project_2',
          componentName: 'Project Two',
          componentQualifier: 'TRK',
          status: 'FAILED',
          submittedAt: '2015-09-17T23:34:59+0200',
          startedAt: '2015-09-17T23:35:00+0200',
          executedAt: '2015-08-13T23:37:00+0200',
          executionTimeMs: 120000,
          logs: false,
          errorMessage: 'Failed to unzip analysis report',
          hasErrorStacktrace: true,
          hasScannerContext: true,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ce = new CE(axiosInstance);
    const result = await ce.activity();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/activity`, {
      params: {
        component: undefined,
        maxExecutedAt: undefined,
        minSubmittedAt: undefined,
        q: undefined,
        type: undefined,
        onlyCurrents: false,
        ps: 100,
        status: [CEStatus.success, CEStatus.failed, CEStatus.canceled].join(','),
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct activity status', async () => {
    const stubResult = {
      status: 200,
      data: {
        pending: 2,
        inProgress: 1,
        failing: 5,
        pendingTime: 100123,
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ce = new CE(axiosInstance);
    const result = await ce.activityStatus();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/activity_status`, {
      params: { componentId: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get component', async () => {
    const stubResult = {
      status: 200,
      data: {
        queue: [{
          organization: 'my-org-1',
          id: 'AU_w84A6gAS1Hm6h4_ih',
          type: 'REPORT',
          componentId: 'AU_w74XMgAS1Hm6h4-Y-',
          componentKey: 'com.github.kevinsawicki:http-request-parent',
          componentName: 'HttpRequest',
          componentQualifier: 'TRK',
          status: 'PENDING',
          submittedAt: '2015-09-21T19:28:54+0200',
          logs: false,
        }],
        current: {
          organization: 'my-org-1',
          id: 'AU_w8LDjgAS1Hm6h4-aY',
          type: 'REPORT',
          componentId: 'AU_w74XMgAS1Hm6h4-Y-',
          componentKey: 'com.github.kevinsawicki:http-request-parent',
          componentName: 'HttpRequest',
          componentQualifier: 'TRK',
          analysisId: '123456',
          status: 'FAILED',
          submittedAt: '2015-09-21T19:25:49+0200',
          startedAt: '2015-09-21T19:25:57+0200',
          finishedAt: '2015-09-21T19:25:58+0200',
          executionTimeMs: 1371,
          logs: false,
          errorMessage: 'the error message',
          errorType: 'the optional error type',
          hasErrorStacktrace: false,
          hasScannerContext: true,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ce = new CE(axiosInstance);
    const result = await ce.component();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/component`, {
      params: { component: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get task', async () => {
    const stubResult = {
      status: 200,
      data: {
        task: {
          organization: 'my-org-1',
          id: 'AVAn5RKqYwETbXvgas-I',
          type: 'REPORT',
          componentId: 'AVAn5RJmYwETbXvgas-H',
          componentKey: 'project_1',
          componentName: 'Project One',
          componentQualifier: 'TRK',
          analysisId: '123456',
          status: 'FAILED',
          submittedAt: '2015-10-02T11:32:15+0200',
          startedAt: '2015-10-02T11:32:16+0200',
          executedAt: '2015-10-02T11:32:22+0200',
          executionTimeMs: 5286,
          errorMessage: 'Fail to extract report AVaXuGAi_te3Ldc_YItm from database',
          logs: false,
          hasErrorStacktrace: true,
          errorStacktrace: 'java.lang.IllegalStateException: Fail to extract report AVaXuGAi_te3Ldc_YItm from database\n\tat org.sonar.server.computation.task.projectanalysis.step.ExtractReportStep.execute(ExtractReportStep.java:50)',
          scannerContext: 'SonarQube plugins:\n\t- Git 1.0 (scmgit)\n\t- Java 3.13.1 (java)',
          hasScannerContext: true,
        },
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ce = new CE(axiosInstance);
    const result = await ce.task('AU-Tpxb--iU5OvuD2FLy');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/task`, {
      params: { id: 'AU-Tpxb--iU5OvuD2FLy', additionalFields: undefined },
    })).to.equal(true);

    const result2 = await ce.task('AU-Tpxb--iU5OvuD2FLy', [CEAdditionalFields.warnings]);
    expect(result2).to.deep.equal(stubResult);
    expect(stubGet.calledWithExactly(`${path}/task`, {
      params: { id: 'AU-Tpxb--iU5OvuD2FLy', additionalFields: CEAdditionalFields.warnings },
    })).to.equal(true);
    stubGet.restore();
  });
});
