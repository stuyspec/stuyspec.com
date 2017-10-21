# client-app
The Client-facing Application of The Stuyvesant Spectator is a modern website, built on [ReactJS](https://github.com/facebook/react).

## Getting started
_Requirement: [Git](https://help.github.com/articles/set-up-git/)_
1. Clone the repo (default branch is `develop`): 
```
git clone https://github.com/stuyspec/client-app
```
2. Enter the repo: 
```
cd client-app/
```
3. Install the node packages used in this project with <u>N</u>ode Package Manager: 
```
npm install
```
4. Build and begin a live reload server on `http://localhost:8080`: 
```
gulp
```

## Coding environment
**WebStorm**: the smartest JavaScript IDE (powerful, but will lag on weak computers). Get a free student license at [JetBrains](https://www.jetbrains.com/student/), then download and install WebStorm.
**Prettier**: we need to add [Prettier](https://github.com/prettier/prettier) to Webstorm to make sure all developers have a uniform coding style.
In the Terminal, add Prettier with yarn: `yarn global add prettier`.  

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

To run Prettier on the entire projects, `cd` to the root of client-app and run
```
find ./src/js/modules -type f -name '*.js' | xargs prettier --write --trailing-comma all
```
