# client-app
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?)](https://github.com/prettier/prettier)

The client-facing application of The Stuyvesant Spectator, built in [React](https://github.com/facebook/react).

## Getting started
1. Clone the repo (default branch is `develop`): 
```
git clone https://github.com/stuyspec/client-app
```
2. Enter the repo: 
```
cd client-app/
```
3. Install the node modules used in this project with Node Package Manager: 
```
npm install && npm install -g gulp-cli
```

## Running the app
Build and begin a live reload server on `http://localhost:8080` by simply running `gulp`.

To set up the development data server, follow the instructions on our the README of our [API](https://github.com/stuyspec/stuy-spec-api). If, however, you need to use data from the real, production API, go to `client-app/src/js/constants.js` and modify the file like so:
```
...
COMMENT THIS LINE OUT --> export const STUY_SPEC_API_URL = "__API_URL_HERE__";
UNCOMMENT THIS LINE   --> //export const STUY_SPEC_API_URL = "https://api.stuyspec.com";
...
```
Be sure to undo these changes whenever committing to a develop, staging, or production branch (`develop`, `staging`, `master`, respectively).

## Contribution

### Prettier
We use [Prettier](https://github.com/prettier/prettier) to make sure all developers have a uniform coding style. Add `prettier` with `yarn global add prettier`. To run Prettier, `cd` to the root of client-app and run
```
find ./src/js/modules -type f -name '*.js' | xargs prettier --write --trailing-comma all
```

### Webstorm
Webstorm is a popular choice for JS developers, but it will lag on weak computers (including standard Macbook Pro). Get a free student license at [JetBrains](https://www.jetbrains.com/student/), then download and install WebStorm.

#### Prettier with Webstorm ####
In Webstorm, navigate to `WebStorm > Preferences > Tools > External Tools`.  

Click on the `+` icon to add a new external tool. Then fill out the `Name` and under the Tool Settings, fill out `Program`, `Parameters` , and `Working directory`.  

```
Program: /usr/local/lib/node_modules/prettier/bin/prettier.js
Parameters: --write --trailing-comma all $FilePathRelativeToProjectRoot$
Working directory: $ProjectFileDir$
```

<img src="https://cdn-images-1.medium.com/max/1600/1*anZPX6XaHHBJQUC4Zz6aSA.png"/>

To set the keybindings for Prettier, navigate to `WebStorm > Preferences > Keymap`. Under `Keymap`, use the search input box to search for `prettier`.

<img src="https://cdn-images-1.medium.com/max/1600/1*rwhqT811uuR2X4ftQpWOPA.png"/>

Double click on Prettier and add keyboard shortcut. I am on a Mac and I personally use `command + shift + p`.  

You are now good to go, now any file that you want to prettify, just go to that specific file in WebStorm and then press your set keybinding and it should automatically prettify the file that you are currently viewing.  

