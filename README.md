# sonarqube-webapis
SonarQube / SonarCloud Web APIs Client Library for Node.js

![unittest](https://github.com/andreyunugro/sonarqube-webapis/actions/workflows/unittest.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/andreyunugro/sonarqube-webapis/badge.svg?branch=main)](https://coveralls.io/github/andreyunugro/sonarqube-webapis?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/5111351fa0ea469cba7c8cf1f7d96400)](https://www.codacy.com/gh/andreyunugro/sonarqube-webapis/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=andreyunugro/sonarqube-webapis&amp;utm_campaign=Badge_Coverage)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5111351fa0ea469cba7c8cf1f7d96400)](https://www.codacy.com/gh/andreyunugro/sonarqube-webapis/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=andreyunugro/sonarqube-webapis&amp;utm_campaign=Badge_Grade)

## Disclaimer
I need this library to automate projects administration tasks submitted to sonarcloud, keep the lines of code matching with current billing plan.

I only use several resources, but since I want to make it public, I have to, at least cover full [SonarCloud Web API](https://sonarcloud.io/web_api/).

This library may not be up to date with latest spec of SonarQube / SonarCloud Web API.

This library may not have the best design, but it works, only depends to [axios](https://www.npmjs.com/package/axios), easy to test so have very high test coverage.

This library does not do any validation, just typechecking and pass it over to web api to validate.

## Install
```sh
npm install sonarqube-webapis --save
```

## Usage Example
See samples folder.

## License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).