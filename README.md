[![npm version](https://badgen.net/npm/v/sequeliseed)](https://www.npmjs.com/package/sequeliseed)
[![npm downloads](https://badgen.net/npm/dm/sequeliseed)](https://www.npmjs.com/package/sequeliseed)
[![Merged PRs](https://badgen.net/github/merged-prs/tharindulucky/sequeliseed)](https://github.com/tharindulucky/sequeliseed)
[![license](https://badgen.net/github/license/tharindulucky/sequeliseed)](https://badgen.net/github/license/tharindulucky/sequeliseed)

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
$ npx sequeliseed generate table_name
```

**To generate multiple seeders from a multiple tables:**

```
$ npx sequeliseed generate table1_name table2_name table3_name
```

Add as many as table names seperated by a space.

**Specify the environment**

You can pass this optional parameter to specify the current environment of your project. The default environment is `development`.

```
$ npx sequeliseed generate table_name --env development
```

Make sure the particular environment is defined in `config.json` file in your [Sequelize](https://github.com/sequelize/sequelize/) installation.

**Manual database configurations**

If you have altered the default `config.json` file of your **Sequelize** installation, [Sequeliseed](https://www.npmjs.com/package/sequeliseed) won't be able to read the database configurations.

So, in that case, you have to manually enter database credentials on the CLI.

Add this `--config` option at the end of the command. And then it'll prompt for certain database credentials.

```
$ npx sequeliseed generate table_name --config
```

## 3. Compatibility

This package currently supports all the database types supported by [Sequelize](https://github.com/sequelize/sequelize/).

## 4. Contribution

This package is open for your suggestions. If you find anything to be added or improved, please fork the repository, build your feature and send a pull request. Or create a new issue if you find something is missing.
