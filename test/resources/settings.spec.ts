import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Settings from '../../src/resources/settings';

describe('Settings', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'settings';
  const components = ['sonar.links.scm', 'sonar.debt.hoursInDay'];

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Settings(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('listDefinitions');
    expect(init).to.respondTo('reset');
    expect(init).to.respondTo('set');
    expect(init).to.respondTo('values');
  });

  it('should get correct list setting definitions', async () => {
    const stubResult = {
      status: 200,
      data: {
        definitions: [{
          key: 'sonar.string',
          name: 'String',
          description: 'String property',
          type: 'STRING',
          category: 'general',
          subCategory: 'test',
          multiValues: false,
          defaultValue: '123',
          options: [],
          fields: [],
        }, {
          key: 'sonar.list',
          name: 'List',
          description: 'List property',
          type: 'SINGLE_SELECT_LIST',
          category: 'general',
          subCategory: 'general',
          multiValues: false,
          options: ['a', 'b'],
          fields: [],
        }, {
          key: 'sonar.multiValues',
          name: 'Multi values',
          description: 'Multi values property',
          type: 'STRING',
          category: 'general',
          subCategory: 'general',
          multiValues: true,
          options: [],
          fields: [],
        }, {
          key: 'sonar.propertySet',
          name: 'Property Set',
          description: 'Property Set property',
          type: 'PROPERTY_SET',
          category: 'property',
          subCategory: 'set',
          multiValues: false,
          options: [],
          fields: [{
            key: 'text',
            name: 'Text',
            description: 'Text field description',
            type: 'TEXT',
            options: [],
          }, {
            key: 'list',
            name: 'List',
            description: 'List field description',
            type: 'SINGLE_SELECT_LIST',
            options: ['value1', 'value2'],
          }],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const set = new Settings(axiosInstance);
    const result = await set.listDefinitions();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list_definitions`, {
      params: { component: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post reset setting', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const set = new Settings(axiosInstance);
    const result = await set.reset(components);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/reset`, `keys=${components.join('%2C')}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct set setting', async () => {
    const test = ['test1', 'test2'];
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const set = new Settings(axiosInstance);
    const result = await set.set(components[0], undefined, undefined, undefined, test);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set`, `key=${components[0]}&values=${test[0]}&values=${test[1]}`)).to.equal(true);

    const resultDefaultSet = await set.set(components[1]);
    expect(resultDefaultSet).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/set`, `key=${components[1]}`)).to.equal(true);

    stubPost.restore();
  });

  it('should get correct setting values', async () => {
    const keys = ['sonar.test.jira', 'sonar.autogenerated', 'sonar.demo'];
    const stubResult = {
      status: 200,
      data: {
        settings: [{
          key: 'sonar.test.jira',
          value: 'abc',
          inherited: true,
        }, {
          key: 'sonar.autogenerated',
          values: ['val1', 'val2', 'val3'],
          inherited: false,
        }, {
          key: 'sonar.demo',
          fieldValues: [{
            boolean: 'true',
            text: 'foo',
          }, {
            boolean: 'false',
            text: 'bar',
          }],
          inherited: false,
        },
        ],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const set = new Settings(axiosInstance);
    const result = await set.values(undefined, keys);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/values`, {
      params: {
        component: undefined,
        keys: keys.join(','),
      },
    })).to.equal(true);

    const resultWithoutKeys = await set.values();
    expect(resultWithoutKeys).to.deep.equal(stubResult);
    expect(stubGet.calledWithExactly(`${path}/values`, {
      params: {
        component: undefined,
        keys: undefined,
      },
    })).to.equal(true);

    stubGet.restore();
  });
});
