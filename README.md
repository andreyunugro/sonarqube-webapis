# sonarqube-webapis
SonarQube / SonarCloud Web APIs Client Library for Node.js

## Disclaimer
I need this library to automate projects administration tasks submitted to sonarcloud, keep the lines of code matching with current billing plan.

I only use several resources, but since I want to make it public, I have to, at least cover full [SonarCloud Web API](https://sonarcloud.io/web_api/).

This library may not have the best design, but it works, only depends to [axios](https://www.npmjs.com/package/axios), easy to test so have very high test coverage.

This library may not be up to date with latest spec of SonarQube / SonarCloud Web API.

## Install
```sh
npm install sonarqube-webapis --save
```

## Usage Example
```js
// Example 1: get all components / projects in the organization.
import { AxiosError } from 'axios';
import Sonar from 'sonarqube-webapis';

(async () => {
  // Initiate Sonar.
  const sonar = new Sonar({
    auth: {
      username: '',
      password: '',
    },
    // You can use sonarcloud / sonarqube web api url.
    baseURL: 'https://sonarcloud.io/api',
  });
  try {
    // {@link https://sonarcloud.io/web_api/api/components/search}
    const result = await sonar.components.search('my-org2');
    // The result is in: result.data
    console.log('Components:', result.data.components);
  } catch (error) {
    // This is to show error messages from sonar.
    console.log('Errors: ',(error as AxiosError).response?.data.errors);
  }
})();
```

## License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).