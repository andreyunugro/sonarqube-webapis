import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import ProjectAnalyses from '../src/resources/projectanalyses';

describe('Project Analyses', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'project_analyses';
  const analysis = 'AU-Tpxb--iU5OvuD2FLy';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new ProjectAnalyses(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('createEvent');
    expect(init).to.respondTo('delete');
    expect(init).to.respondTo('deleteEvent');
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('setBaseline');
    expect(init).to.respondTo('unsetBaseline');
    expect(init).to.respondTo('updateEvent');
  });

  it('should post correct create event', async () => {
    const stubResult = {
      status: 200,
      data: {
        event: {
          analysis: 'A2',
          key: 'E1',
          category: 'OTHER',
          name: 'My Custom Event',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.createEvent(analysis, '5.6');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create_event`, `analysis=${analysis}&name=5.6&category=OTHER`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete project analysis', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.delete(analysis);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete`, `analysis=${analysis}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete event', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.deleteEvent(analysis);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete_event`, `event=${analysis}`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 3,
        },
        analyses: [{
          key: 'A2',
          date: '2016-12-12T17:12:45+0100',
          events: [{
            key: 'E21',
            category: 'QUALITY_PROFILE',
            name: 'Quality Profile changed to Sonar Way',
          }, {
            key: 'E22',
            category: 'OTHER',
            name: '6.3',
          }],
          projectVersion: '1.2.1',
          buildString: '1.2.1.423',
          manualNewCodePeriodBaseline: false,
          revision: 'be6c75b85da526349c44e3978374c95e0b80a96d',
        }, {
          key: 'A1',
          date: '2016-12-11T17:12:45+0100',
          events: [{
            key: 'E11',
            category: 'QUALITY_GATE',
            name: 'Quality Gate is Red (was Orange)',
            description: 'Coverage is \u003c 80%',
          }, {
            key: 'E12',
            category: 'VERSION',
            name: '6.3',
          }],
          projectVersion: '1.2',
          buildString: '1.2.0.322',
          manualNewCodePeriodBaseline: true,
          revision: 'bfe36592eb7f9f2708b5d358b5b5f33ed535c8cf',
        }, {
          key: 'P1',
          date: '2015-11-11T10:00:00+0100',
          events: [{
            key: 'E31',
            category: 'QUALITY_GATE',
            name: 'Quality Gate is Red',
            description: '',
          }],
          projectVersion: '1.2',
          buildString: '1.2.0.321',
          manualNewCodePeriodBaseline: false,
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.search('my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: {
        project: 'my_project',
        branch: undefined,
        category: undefined,
        from: undefined,
        to: undefined,
        p: 1,
        ps: 100,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct set baseline', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.setBaseline(analysis, 'my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_baseline`, `analysis=${analysis}&project=my_project`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct unset baseline', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.unsetBaseline('my_project');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/unset_baseline`, 'project=my_project')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct update event', async () => {
    const stubResult = {
      status: 200,
      data: {
        event: {
          analysis: 'A2',
          key: 'E1',
          category: 'OTHER',
          name: 'My Custom Event',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const pa = new ProjectAnalyses(axiosInstance);
    const result = await pa.updateEvent(analysis, '5.6');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update_event`, `event=${analysis}&name=5.6`)).to.equal(true);
    stubPost.restore();
  });
});
