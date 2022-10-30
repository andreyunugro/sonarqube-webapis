/**
 * @file
 * sample-01.ts
 *
 * Example 1: makesure your web api credential is correct.
 *
 * @see https://docs.sonarqube.org/latest/extend/web-api/#header-2
 */

import { AxiosError } from 'axios';
import Sonar from 'sonarqube-webapis';

(async () => {
  // Initiate Sonar.
  const sonar = new Sonar({
    // 1. User token: set your token in the username, set empty string password.
    // 2. Basic access: set your standard login username & password.
    auth: {
      username: 'token / your login username',
      password: 'empty string / your login password',
    },
    // You can use sonarcloud / sonarqube web api url.
    baseURL: 'https://sonarcloud.io/api',
    // baseURL: 'http://localhost:9000/api',
  });
  try {
    // {@link https://sonarcloud.io/web_api/api/authentication/validate}
    // {@link http://localhost:9000/web_api/api/authentication/validate}
    const result = await sonar.authentication.validate();
    // The result is in: result.data
    // Sample: { valid: true }
    console.log('Validation result:', result.data);
  } catch (error) {
    // This is to show error messages from sonar.
    console.log('Errors: ', (error as AxiosError).response?.data);
  }
})();
