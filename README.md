# Trabuchi-Applaudo-Challenge

This is a test automation project that utilizes BrowserStack, WebDriverIO, Appium, and TypeScript to test an Android mobile application.

## Project Structure

The project follows the following folder structure:

- **app**: Contains the APK of the application to be used for testing.
- **config**: Contains two different configurations for running tests, one for local execution and another for execution on BrowserStack.
- **test**: Contains the following subfolders:
  - **pageObjects**: Here you'll find page objects representing elements of the application's interface.
  - **specs**: Contains test specification files.
  - **utils**: Includes utility functions for tests.
- **babel.conf.js**: Babel configuration for transpiling the code.
- **jsconfig.json**: Configuration for WebDriverIO autocompletion in TypeScript.
- **tsconfig.json**: TypeScript configuration for the project.

## Dependencies

This project relies on the following dependencies:

- **@babel/cli**: Babel command-line tool.
- **@babel/core**: Babel core for code transpilation.
- **@babel/preset-env**: Babel preset for transpiling to the latest JavaScript version.
- **@babel/register**: Babel register for test execution.
- **@faker-js/faker**: Library for generating fake data.
- **@wdio/appium-service**: Appium service for WebDriverIO.
- **@wdio/browserstack-service**: BrowserStack service for WebDriverIO.
- **@wdio/cli**: WebDriverIO command-line tool.
- **@wdio/local-runner**: Local execution of WebDriverIO.
- **@wdio/mocha-framework**: Mocha test framework for WebDriverIO.
- **@wdio/spec-reporter**: Result reporter for WebDriverIO.
- **appium**: Mobile test automation with Appium.
- **appium-uiautomator2-driver**: Appium driver for Android.
- **ts-node**: Running TypeScript on Node.js.
- **typescript**: TypeScript compiler.

## Scripts

In the `package.json` file, the following scripts have been defined to run the tests:

- `wdio-local`: Executes tests in the local environment using the configuration in `./config/wdio.conf.ts`.
- `bsstack`: Runs tests on BrowserStack using the configuration in `./config/wdio.conf.stack.ts`.

To execute a test, you can use the following command:

```bash
npm run wdio-local


## Side notes

There are some test cases that could fail due to different reason, that's why you will notice that I add the retries property in the `wdio.conf.ts`.

Regarding the browserstack part, I'm not 100% sure if all the test cases are passing, because I'm working from my girlfriend's town and in here the internet is not the best.