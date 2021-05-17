<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/sequeliseed">

<img alt="npm" src="https://img.shields.io/npm/v/sequeliseed">

<img alt="npm" src="https://img.shields.io/npm/dw/sequeliseed">

<img alt="NPM" src="https://img.shields.io/npm/l/sequeliseed">

**Sequeliseed** is an inverse seed package that allows you to generate seeds from existing data in database tables.

**Note: This package currently supports [Sequelize](https://github.com/sequelize/sequelize/) ORM only.**

## 1. Installation

```
$ npm i sequeliseed
```

Make sure you have already installed [Sequelize](https://github.com/sequelize/sequelize/) ORM prior to the installation of this package.

## 2. Usage

The usage is pretty straightforward. [Sequeliseed](https://www.npmjs.com/package/sequeliseed) has its own CLI for running commands.

**To generate a single seeder from a single table:**

```
$ sequeliseed generate table_name
```

**To generate multiple seeders from a multiple tables:**

```
$ sequeliseed generate table1_name table2_name table3_name
```

Add as many as table names seperated by a space.

**Specify the environment**

You can pass this optional parameter to specify the current environment of your project. The default environment is `development`.

```
$ sequeliseed generate table1_name --env development
```

Make sure the particular environment is defined in `config.json` file in your [Sequelize](https://github.com/sequelize/sequelize/) installation.

## 3. Compatibility

This package currently supports all the database types supported by [Sequelize](https://github.com/sequelize/sequelize/).

## 4. Contribution

This package is open for your suggestions. If you find anything to be added or improved, please fork the repository, build your feature and send a pull request. Or create a new issue if you find something is missing.
