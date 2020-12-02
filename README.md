[![npm version](https://badge.fury.io/js/hardhat-gas-reporter.svg)](https://badge.fury.io/js/hardhat-gas-reporter)
[![Build Status](https://travis-ci.org/cgewecke/hardhat-gas-reporter.svg?branch=master)](https://travis-ci.org/cgewecke/hardhat-gas-reporter)
[![Codechecks](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)
[![buidler](https://hardhat.org/buidler-plugin-badge.svg?1)](https://github.com/cgewecke/hardhat-gas-reporter)


# hardhat-gas-reporter

[eth-gas-reporter](https://github.com/cgewecke/eth-gas-reporter) plugin for [hardhat](http://gethardhat.com).

## What

**A Mocha reporter for Ethereum test suites:**

- Gas usage per unit test.
- Metrics for method calls and deployments.
- National currency costs of deploying and using your contract system.
- CI integration with [codechecks<sup>beta</sup>](http://codechecks.io)

### Example report

![Screen Shot 2019-06-23 at 2 10 19 PM](https://user-images.githubusercontent.com/7332026/59982003-c30a4380-95c0-11e9-9d93-e3af979df227.png)

## Installation

```bash
npm install hardhat-gas-reporter --save-dev
```

And add the following to your `hardhat.config.js`:
```js
require("hardhat-gas-reporter");
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:
```ts
import "hardhat-gas-reporter"
```

**Looking for buidler-gas-reporter docs?** [They moved here...][1]

## Configuration
Configuration is optional.
```js
module.exports = {
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21
  }
}
```
:bulb: **Pro Tip**

The options include an `enabled` key that lets you toggle gas reporting on and off using shell
environment variables. When `enabled` is false, mocha's (faster) default spec reporter is used.
Example:

```js
module.exports = {
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  }
}
```
## Usage

This plugin overrides the built-in `test` task. Gas reports are generated by default with:
```
npx hardhat test
```

## Continuous Integration

This reporter comes with a [codechecks](http://codechecks.io) CI integration that
displays a pull request's gas consumption changes relative to its target branch in the Github UI.
It's like coveralls for gas. The codechecks service is free for open source and maintained by MakerDao engineer [@krzkaczor](https://github.com/krzkaczor).

Complete [set-up guide here](https://github.com/cgewecke/eth-gas-reporter/blob/master/docs/codechecks.md) (it's easy).

![Screen Shot 2019-06-18 at 12 25 49 PM](https://user-images.githubusercontent.com/7332026/59713894-47298900-91c5-11e9-8083-233572787cfa.png)

## Options

:warning: **CoinMarketCap API change** :warning:

Beginning March 2020, CoinMarketCap requires an API key to access currency market
price data. The reporter uses an unprotected free tier key by default (10k reqs/mo). You can get
your own API key [here][55] and set it with the `coinmarketcap` option.

| Option            | Type                   | Default                     | Description                                                                                                                                                                                                                                  |
| ----------------- | ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled          | _Boolean_               | true                    | Always generate gas reports when running the hardhat test command.                                                                                                                                                           |
| currency          | _String_               | 'EUR'                       | National currency to represent gas costs in. Exchange rates loaded at runtime from the `coinmarketcap` api. Available currency codes can be found [here](https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions). |
| coinmarketcap     | _String_               | (unprotected API key)       | [API key][55] to use when fetching current market price data. (Use this if you stop seeing price data)                                                                                                                                       |
| gasPrice          | _Number_               | (varies)                    | Denominated in `gwei`. Default is loaded at runtime from the `eth gas station` api                                                                                                                                                           |
| outputFile        | _String_               | stdout                      | File path to write report output to                                                                                                                                                                                                          |
| noColors          | _Boolean_              | false                       | Suppress report color. Useful if you are printing to file b/c terminal colorization corrupts the text.                                                                                                                                       |
| onlyCalledMethods | _Boolean_              | true                        | Omit methods that are never called from report.                                                                                                                                                                                              |
| rst               | _Boolean_              | false                       | Output with a reStructured text code-block directive. Useful if you want to include report in RTD                                                                                                                                            |
| rstTitle          | _String_               | ""                          | Title for reStructured text header (See Travis for example output)                                                                                                                                                                           |
| showTimeSpent     | _Boolean_              | false                       | Show the amount of time spent as well as the gas consumed                                                                                                                                                                                    |
| excludeContracts  | _String[]_             | []                          | Contract names to exclude from report. Ex: `['Migrations']`                                                                                                                                                                                  |
| src               | _String_               | "contracts"                 | Folder in root directory to begin search for `.sol` files. This can also be a path to a subfolder relative to the root, e.g. "planets/annares/contracts"                                                                                     |
| url               | _String_               | `http://localhost:8545` (or network value) | RPC client url                                                                                                                                                                                                  |
| proxyResolver     | _Function_             | none                        | Custom method to resolve identity of methods managed by a proxy contract.                                                                                                                                                                    |
| showMethodSig     | _Boolean_              | false                       | Display complete method signatures. Useful when you have overloaded methods you can't tell apart.                                                                                                                                            |
| maxMethodDiff     | _Number_               | undefined                   | Codechecks failure threshold, triggered when the % diff for any method is greater than `number` (integer)                                                                                                                                    |
| maxDeploymentDiff | _Number_               | undefined                   | Codechecks failure threshold, triggered when the % diff for any deployment is greater than `number` (integer)                                                                                                                                |
| remoteContracts | _RemoteContract[]_               | `[]`                  | Contracts pre-deployed to a (forked) network which the reporter should collect gas usage data for. (See [RemoteContract type][44])                                |

[44]: https://github.com/cgewecke/hardhat-gas-reporter/blob/master/src/types.ts#L27
[55]: https://coinmarketcap.com/api/pricing/


## Documentation

Other useful documentation can be found at [eth-gas-reporter](https://github.com/cgewecke/eth-gas-reporter)

[1]: https://github.com/cgewecke/buidler-gas-reporter/tree/buidler-final#installation

