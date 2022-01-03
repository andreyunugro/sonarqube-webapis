import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Metrics from '../../src/resources/metrics';

describe('Metrics', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'metrics';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Metrics(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('search');
    expect(init).to.respondTo('types');
  });

  it('should get correct search url', async () => {
    const stubResult = {
      status: 200,
      data: {
        metrics: [
          {
            id: '23',
            key: 'team_size',
            name: 'Team size',
            description: 'Number of people in the team',
            domain: 'Management',
            type: 'INT',
            direction: 0,
            qualitative: false,
            hidden: false,
            custom: true,
          },
          {
            id: '2',
            key: 'uncovered_lines',
            name: 'Uncovered lines',
            description: 'Uncovered lines',
            domain: 'Tests',
            type: 'INT',
            direction: 1,
            qualitative: true,
            hidden: false,
            custom: false,
          },
        ],
        total: 2,
        p: 1,
        ps: 100,
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const metric = new Metrics(axiosInstance);
    const result = await metric.search();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search`, {
      params: { p: 1, ps: 100 },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct types url', async () => {
    const stubResult = {
      status: 200,
      data: {
        types: [
          'INT',
          'FLOAT',
          'PERCENT',
          'BOOL',
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const metric = new Metrics(axiosInstance);
    const result = await metric.types();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/types`)).to.equal(true);
    stubGet.restore();
  });
});
