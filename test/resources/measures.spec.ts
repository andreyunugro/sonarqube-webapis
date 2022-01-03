import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { SonarComponentsQualifiers, SonarMetricKey } from '../../src/enums';
import Measures, { MeasuresAdditionalFields } from '../../src/resources/measures';

describe('Measures', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'measures';
  const component = 'my_project';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Measures(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('component');
    expect(init).to.respondTo('componentTree');
    expect(init).to.respondTo('searchHistory');
  });

  it('should get correct measures component url', async () => {
    const stubResult = {
      status: 200,
      data: {
        component: {
          key: 'MY_PROJECT:ElementImpl.java',
          name: 'ElementImpl.java',
          qualifier: 'FIL',
          language: 'java',
          path: 'src/main/java/com/sonarsource/markdown/impl/ElementImpl.java',
          measures: [{
            metric: 'complexity',
            value: '12',
          }, {
            metric: 'new_violations',
            periods: [{
              index: 1,
              value: '25',
              bestValue: false,
            }],
          }, {
            metric: 'ncloc',
            value: '114',
          }],
        },
        metrics: [{
          key: 'complexity',
          name: 'Complexity',
          description: 'Cyclomatic complexity',
          domain: 'Complexity',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: false,
          hidden: false,
          custom: false,
        }, {
          key: 'ncloc',
          name: 'Lines of code',
          description: 'Non Commenting Lines of Code',
          domain: 'Size',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: false,
          hidden: false,
          custom: false,
        }, {
          key: 'new_violations',
          name: 'New issues',
          description: 'New Issues',
          domain: 'Issues',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: true,
          hidden: false,
          custom: false,
        }],
        periods: [
          {
            index: 1,
            mode: 'previous_version',
            date: '2016-01-11T10:49:50+0100',
            parameter: '1.0-SNAPSHOT',
          },
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const measure = new Measures(axiosInstance);
    const result = await measure.component(component, [
      SonarMetricKey.ncloc, SonarMetricKey.complexity, SonarMetricKey.violations,
    ]);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/component`, {
      params: {
        component,
        metricKeys: 'ncloc,complexity,violations',
        branch: undefined,
        pullRequest: undefined,
      },
    })).to.equal(true);

    const result2 = await measure.component(component, [
      SonarMetricKey.ncloc, SonarMetricKey.complexity, SonarMetricKey.violations,
    ], [MeasuresAdditionalFields.metrics]);
    expect(result2).to.deep.equal(stubResult);
    expect(stubGet.calledWithExactly(`${path}/component`, {
      params: {
        component,
        metricKeys: 'ncloc,complexity,violations',
        branch: undefined,
        pullRequest: undefined,
        additionalFields: MeasuresAdditionalFields.metrics,
      },
    })).to.equal(true);

    stubGet.restore();
  });

  it('should get correct measures component tree url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 3,
        },
        baseComponent: {
          key: 'MY_PROJECT',
          name: 'My Project',
          qualifier: 'TRK',
          measures: [{
            metric: 'new_violations',
            periods: [{
              index: 1,
              value: '255',
            }],
          }, {
            metric: 'complexity',
            value: '42',
          }, {
            metric: 'ncloc',
            value: '1984',
          }],
        },
        components: [{
          key: 'com.sonarsource:java-markdown:src/main/java/com/sonarsource/markdown/impl/ElementImpl.java',
          name: 'ElementImpl.java',
          qualifier: 'FIL',
          language: 'java',
          path: 'src/main/java/com/sonarsource/markdown/impl/ElementImpl.java',
          measures: [{
            metric: 'new_violations',
            periods: [{
              index: 1,
              value: '25',
            }],
          }, {
            metric: 'complexity',
            value: '12',
          }, {
            metric: 'ncloc',
            value: '114',
          }],
        }, {
          key: 'com.sonarsource:java-markdown:src/test/java/com/sonarsource/markdown/impl/ElementImplTest.java',
          name: 'ElementImplTest.java',
          qualifier: 'UTS',
          language: 'java',
          path: 'src/test/java/com/sonarsource/markdown/impl/ElementImplTest.java',
          measures: [{
            metric: 'new_violations',
            periods: [{
              index: 1,
              value: '0',
            }],
          },
          ],
        }, {
          key: 'com.sonarsource:java-markdown:src/main/java/com/sonarsource/markdown/impl',
          name: 'src/main/java/com/sonarsource/markdown/impl',
          qualifier: 'DIR',
          path: 'src/main/java/com/sonarsource/markdown/impl',
          measures: [{
            metric: 'new_violations',
            periods: [{
              index: 1,
              value: '25',
            }],
          }, {
            metric: 'complexity',
            value: '35',
          }, {
            metric: 'ncloc',
            value: '217',
          }],
        },
        ],
        metrics: [{
          key: 'complexity',
          name: 'Complexity',
          description: 'Cyclomatic complexity',
          domain: 'Complexity',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: false,
          hidden: false,
          custom: false,
        }, {
          key: 'ncloc',
          name: 'Lines of code',
          description: 'Non Commenting Lines of Code',
          domain: 'Size',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: false,
          hidden: false,
          custom: false,
        }, {
          key: 'new_violations',
          name: 'New issues',
          description: 'New Issues',
          domain: 'Issues',
          type: 'INT',
          higherValuesAreBetter: false,
          qualitative: true,
          hidden: false,
          custom: false,
          bestValue: '0',
        }],
        periods: [{
          index: 1,
          mode: 'previous_version',
          date: '2016-01-11T10:49:50+0100',
          parameter: '1.0-SNAPSHOT',
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const measure = new Measures(axiosInstance);
    const result = await measure.componentTree(component, [
      SonarMetricKey.ncloc, SonarMetricKey.complexity, SonarMetricKey.violations,
    ]);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/component_tree`, {
      params: {
        component,
        metricKeys: 'ncloc,complexity,violations',
        metricSortFilter: 'all',
        asc: true,
        p: 1,
        ps: 100,
        s: 'name',
        strategy: 'all',
        branch: undefined,
        pullRequest: undefined,
        q: undefined,
        metricPeriodSort: undefined,
        metricSort: undefined,
      },
    })).to.equal(true);
    const result2 = await measure.componentTree(component, [
      SonarMetricKey.ncloc, SonarMetricKey.complexity, SonarMetricKey.violations,
    ], [
      MeasuresAdditionalFields.periods,
    ], undefined, undefined, undefined, [SonarComponentsQualifiers.BRC]);
    expect(result2).to.deep.equal(stubResult);
    expect(stubGet.calledWithExactly(`${path}/component_tree`, {
      params: {
        component,
        metricKeys: 'ncloc,complexity,violations',
        metricSortFilter: 'all',
        asc: true,
        p: 1,
        ps: 100,
        s: 'name',
        strategy: 'all',
        branch: undefined,
        pullRequest: undefined,
        q: undefined,
        metricPeriodSort: undefined,
        metricSort: undefined,
        additionalFields: MeasuresAdditionalFields.periods,
        qualifiers: SonarComponentsQualifiers.BRC,
      },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should get correct measures search history url', async () => {
    const stubResult = {
      status: 200,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 3,
        },
        measures: [{
          metric: 'complexity',
          history: [{
            date: '2017-01-23T17:00:53+0100',
            value: '45',
          }, {
            date: '2017-01-24T17:00:53+0100',
            value: '45',
          }, {
            date: '2017-01-25T17:00:53+0100',
            value: '45',
          }],
        }, {
          metric: 'ncloc',
          history: [{
            date: '2017-01-23T17:00:53+0100',
            value: '47',
          }, {
            date: '2017-01-24T17:00:53+0100',
            value: '47',
          }, {
            date: '2017-01-25T17:00:53+0100',
            value: '47',
          }],
        }, {
          metric: 'new_violations',
          history: [{
            date: '2017-01-23T17:00:53+0100',
            value: '46',
          }, {
            date: '2017-01-24T17:00:53+0100',
            value: '46',
          }, {
            date: '2017-01-25T17:00:53+0100',
            value: '46',
          }],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const measure = new Measures(axiosInstance);
    const result = await measure.searchHistory(component, [
      SonarMetricKey.ncloc, SonarMetricKey.coverage, SonarMetricKey.newViolations,
    ]);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search_history`, {
      params: {
        component,
        metrics: 'ncloc,coverage,new_violations',
        p: 1,
        ps: 100,
        branch: undefined,
        from: undefined,
        to: undefined,
        pullRequest: undefined,
      },
    })).to.equal(true);
    stubGet.restore();
  });
});
