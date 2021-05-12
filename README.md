# stuyspec.com
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?)](https://github.com/prettier/prettier)

The client-facing application of The Stuyvesant Spectator, built in [React](https://github.com/facebook/react).

## Contributing

We welcome pull requests from Spec Web developers and seasoned JavaScript developers alike! Please follow [these steps](CONTRIBUTING.md) to contribute.

## Roadmap

For information on the things which are currently being focused on, please visit the [ROADMAP.md](ROADMAP.md) file.

## Setting Up

1. Clone the repository

```
$ git clone https://github.com/stuyspec/stuyspec.com.git
```

2. In the `stuyspec.com` folder, run 

```
npm install
```

3. Run the application

```
npm start
```

4. Experiment with the code!
> React automatically hot reloads the code so it will take a few seconds to see your code reflect in the build

## Deploying

To push new features to the website, please make sure they work on your local repo first. After having your features merged into the ``develop`` branch, go into your local [stuy-spec-api](https://github.com/stuyspec/stuyspec-api) repo and run ``bundle exec cap production deploy``
