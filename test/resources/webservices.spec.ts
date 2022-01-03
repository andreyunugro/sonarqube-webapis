import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { WebServices } from '../../src/resources';

describe('Web Services', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'webservices';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new WebServices(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('list');
    expect(init).to.respondTo('responseExample');
  });

  it('should get correct list url', async () => {
    const stubResult = {
      status: 200,
      data: {
        webServices: [{
          path: 'api/metric',
          description: 'Metrics',
          actions: [{
            key: 'create',
            description: 'Create metric',
            deprecatedSince: '5.3',
            internal: false,
            post: true,
            hasResponseExample: true,
            changelog: [{
              description: "Requires 'Administer System' permission instead of 'Administer Quality Profiles'",
              version: '6.6',
            }, {
              description: 'Remove database ID from response',
              version: '6.0',
            }, {
              description: 'Deprecate database ID in response',
              version: '4.5',
            }],
            params: [{
              key: 'constrained_numeric_param',
              required: false,
              internal: false,
              maximumValue: 12,
            }, {
              key: 'constrained_string_param',
              required: false,
              internal: false,
              maximumLength: 64,
              minimumLength: 3,
            }, {
              key: 'name',
              required: false,
              internal: false,
            }, {
              key: 'severity',
              description: 'Severity',
              required: false,
              internal: false,
              defaultValue: 'BLOCKER',
              exampleValue: 'INFO',
              deprecatedSince: '5.2',
              deprecatedKey: 'old_severity',
              deprecatedKeySince: '4.6',
              possibleValues: ['BLOCKER', 'INFO'],
            }],
          }, {
            key: 'show',
            internal: false,
            post: false,
            hasResponseExample: true,
          }],
        }, {
          path: 'api/webservices',
          description: 'Get information on the web api supported on this instance.',
          actions: [{
            key: 'list',
            description: 'List web services',
            internal: false,
            post: false,
            hasResponseExample: true,
          }, {
            key: 'response_example',
            description: 'Display web service response example',
            internal: false,
            post: false,
            hasResponseExample: true,
            params: [{
              key: 'action',
              required: true,
              description: 'Action of the web service',
              exampleValue: 'search',
            }, {
              key: 'controller',
              required: true,
              description: 'Controller of the web service',
              exampleValue: 'api/issues',
            }],
          }],
        }],
      },
    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ws = new WebServices(axiosInstance);
    const result = await ws.list();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/list`)).to.equal(true);
    stubGet.restore();
  });

  it('should get correct response example url', async () => {
    const stubResult = {
      status: 200,
      data: {
        format: 'json',
        example: "{\n  \"paging\": {\n    \"pageIndex\": 1,\n    \"pageSize\": 100,\n    \"total\": 1\n  },\n  \"issues\": [\n    {\n      \"key\": \"01fc972e-2a3c-433e-bcae-0bd7f88f5123\",\n      \"component\": \"com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest\",\n      \"project\": \"com.github.kevinsawicki:http-request\",\n      \"rule\": \"checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck\",\n      \"status\": \"RESOLVED\",\n      \"resolution\": \"FALSE-POSITIVE\",\n      \"severity\": \"MINOR\",\n      \"message\": \"'3' is a magic number.\",\n      \"line\": 530,\n      \"textRange\": {\n        \"startLine\": 81,\n        \"endLine\": 81,\n        \"startOffset\": 0,\n        \"endOffset\": 134\n      },\n      \"author\": \"Developer 1\",\n      \"debt\": \"2h1min\",\n      \"creationDate\": \"2013-05-13T17:55:39+0200\",\n      \"updateDate\": \"2013-05-13T17:55:39+0200\",\n      \"tags\": [\"bug\"],\n      \"comments\": [\n        {\n          \"key\": \"7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba\",\n          \"login\": \"john.smith\",\n          \"htmlText\": \"Must be &quot;final&quot;!\",\n          \"markdown\": \"Must be \\\"final\\\"!\",\n          \"updatable\": false,\n          \"createdAt\": \"2013-05-13T18:08:34+0200\"\n        }\n      ],\n      \"attr\": {\n        \"jira-issue-key\": \"SONAR-1234\"\n      },\n      \"transitions\": [\n        \"unconfirm\",\n        \"resolve\",\n        \"falsepositive\"\n      ],\n      \"actions\": [\n        \"comment\"\n      ]\n    }\n  ],\n  \"components\": [\n    {\n      \"key\": \"com.github.kevinsawicki:http-request:src/main/java/com/github/kevinsawicki/http/HttpRequest.java\",\n      \"enabled\": true,\n      \"qualifier\": \"FIL\",\n      \"name\": \"HttpRequest.java\",\n      \"longName\": \"src/main/java/com/github/kevinsawicki/http/HttpRequest.java\",\n      \"path\": \"src/main/java/com/github/kevinsawicki/http/HttpRequest.java\"\n    },\n    {\n      \"key\": \"com.github.kevinsawicki:http-request\",\n      \"enabled\": true,\n      \"qualifier\": \"TRK\",\n      \"name\": \"http-request\",\n      \"longName\": \"http-request\"\n    }\n  ],\n  \"rules\": [\n    {\n      \"key\": \"checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck\",\n      \"name\": \"Magic Number\",\n      \"status\": \"READY\",\n      \"lang\": \"java\",\n      \"langName\": \"Java\"\n    }\n  ],\n  \"users\": [\n    {\n      \"login\": \"admin\",\n      \"name\": \"Administrator\",\n      \"active\": true,\n      \"email\": \"admin@sonarqube.org\"\n    }\n  ]\n\n}",
      },

    };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const ws = new WebServices(axiosInstance);
    const controller = 'api/issues';
    const action = 'search';
    const result = await ws.responseExample(controller, action);
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/response_example`, {
      params: { controller, action },
    })).to.equal(true);
    stubGet.restore();
  });
});
