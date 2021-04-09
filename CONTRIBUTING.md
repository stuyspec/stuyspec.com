# Contribution Guidelines

_These guidelines are based off those of [freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp), protected under the BSD 3-Clause License._

### Setup

- [Prerequisites](#prerequisites)
- [Forking the Project](#forking-the-project)
- [Set Up MailHog](#set-up-mailhog)
- [Set Up Repo](#set-up-repo)
- [Create a Branch](#create-a-branch)

### Create

- [Make Changes](#make-changes)

### Submit

- [Creating a Pull Request](#creating-a-pull-request)
- [Next Steps](#next-steps)

### Extras
- [Code style and Prettier](#code-style-and-prettier)

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [Node.js](http://nodejs.org)                | `~ ^8.9.3`  |
| npm (comes with Node)                       | `~ ^5`  |

> _[What's the difference between a tilde (~) and a caret (^) in a npm package.json file?](https://michaelsoolee.com/npm-package-tilde-caret/)_.

If Node.js is already installed on your machine, run the following commands to validate the versions:

```shell
node -v
```

### Forking the Project

#### Setting Up Your System

1. Install [Git](https://git-scm.com/) or your favorite Git client.
2. (Optional) [Set Up an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.

#### Forking the Repo

1. Go to the top level stuyspec.com repository: <https://github.com/stuyspec/stuyspec.com>
2. Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3. After the repository (repo) has been forked, you will be taken to your copy of the stuyspec.com repo at <https://github.com/YOUR_USERNAME/stuyspec.com>

#### Cloning Your Fork

1. Open a Terminal / Command Line / Bash Shell in your projects directory (_i.e.: `/yourprojectdirectory/`_)
2. Clone your fork of stuyspec.com

```shell
$ git clone https://github.com/YOUR_USERNAME/stuyspec.com.git
```

This will download the entire stuyspec.com repo to your projects directory.

#### Set Up Your Upstream

1. Change directory to the new stuyspec.com directory (`cd stuyspec.com`)
2. Add a remote to the official stuyspec.com repo:

```shell
$ git remote add upstream https://github.com/stuyspec/stuyspec.com.git
```

Congratulations, you now have a local copy of the stuyspec.com repo!

#### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

##### Rebasing from Upstream

Do this prior to every time you create a branch for a pull request (PR):

1. Make sure you are on the `develop` branch

```shell
$ git status
On branch develop
Your branch is up-to-date with 'origin/develop'.
```
If your aren't on `develop`, resolve outstanding files / commits and checkout the `develop` branch

```shell
$ git checkout develop
```

2. Do a pull with rebase against `upstream`

```shell
$ git pull --rebase upstream develop
```

This will pull down all of the changes to the official develop branch, without making an additional commit in your local repo.

### Set Up MailHog (Optional)

If you want to test account creation, you need to set up MailHog. MailHog is a local SMTP mail server that will catch the emails your stuyspec.com instance is sending. How you install MailHog is dependent upon your OS. 

#### macOS

Here is how to set up MailHog on macOS with [Homebrew](https://brew.sh/):

```bash
brew install mailhog
brew services start mailhog
```

Open <http://localhost:8025/> to see caught mail.

#### Windows

Download the latest MailHog version from [MailHog's official repository](https://github.com/mailhog/MailHog/blob/master/docs/RELEASES.md). Click on the link for your Windows version (32 or 64 bit) and .exe file will be downloaded to your computer.

Once it finishes downloading, click on the file. You will probably get a Windows firewall notification where you will have to allow access to MailHog. Once you do, a standard Windows command line prompt will open with MailHog already running.

To close MailHog, close the command prompt. To run it again, click on the same .exe file. You don't need to download a new one.

### Set Up Repo

Once you have stuyspec.com cloned, before you start the application, you first need to install all of the dependencies:

```bash
# Install NPM dependencies
npm install
```
By default, stuyspec.com will try to connect to a local version of the api server hosted at <http://api.localhost:3000>. However, when starting, it's simpler to point stuyspec.com to the production API and use real data. To do that, set `REACT_APP_API_URL` in `.env.development` to <https://api.stuyspec.com>. 

Now you can start the application:

```bash
npm start
```

Now navigate to your browser and open <http://localhost:3002>. If the app loads, congratulations---you're all set.

If you ever want to test with your own data, you will need to [set up our API on localhost](https://github.com/stuyspec/stuy-spec-api/blob/develop/README.md). To use that server, you'll want to change `REACT_APP_API_URL` in `.env.development` back to <http://api.localhost:3000>.

### Create a Branch

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature 
you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

**If you need more help with branching, take a look at [this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).**

### Make Changes

This bit is up to you!

When you're ready to share your code, create a pull request.

### Creating a Pull Request

A pull request (PR) is a method of submitting proposed changes to the stuyspec.com
repo (or any repo, for that matter). You will make changes to copies of the
files which make up stuyspec.com in a personal fork, then apply to have them
accepted by a stuyspec.com maintainer.

1.  Perform the maintenance step of rebasing `develop`.
2.  Ensure you are on the `develop` branch using `git status`:

```bash
$ git status
On branch develop
Your branch is up-to-date with 'origin/develop'.

nothing to commit, working directory clean
```

1.  If you are not on develop or your working directory is not clean, resolve
    any outstanding files/commits and checkout develop `git checkout develop`

2.  Create a branch off of `develop` with git: `git checkout -B
    branch/name-here` **Note:** Branch naming is important. Use a name like
    `fix/short-fix-description` or `feature/short-feature-description`.

3.  Edit your file(s) locally with the editor of your choice.

4.  Check your `git status` to see unstaged files.

5.  Add your edited files: `git add path/to/filename.ext` You can also do: `git
    add .` to add all unstaged files. Take care, though, because you can
    accidentally add files you don't want added. Review your `git status` first.

6.  Commit your edits. Refer to [Writing good commit messages](https://github.com/erlang/otp/wiki/writing-good-commit-messages).

7.  Push your commits to your GitHub Fork: `git push origin branch/name-here`

In your web browser go to your repository fork's GitHub Page.

1.  Once the edits have been committed, you will be prompted to create a pull
    request on that page.

2.  By default, all pull requests should be against the stuyspec.com main repo, `develop`
    branch.

3.  Submit a pull request to stuyspec.com's `develop` branch.

4.  The title (also called the subject) of your PR should be descriptive of your
    changes and succinctly indicates what is being fixed.

    -   Examples: `Add Test Cases to Bonfire Drop It` `Correct typo in Waypoint
        Size Your Images`

5.  In the body of your PR include a more detailed summary of the changes you
    made and why.

    -   If the PR is meant to fix an existing bug/issue then, at the end of
        your PR's description, append the keyword `closes` and #xxxx (where xxxx
        is the issue number). Example: `closes #1337`. This tells GitHub to
        close the existing issue, if the PR is merged.

### Next Steps

#### If your PR is accepted

Once your PR is accepted, you may delete the branch you created to submit it.
This keeps your working fork clean.

You can do this with a press of a button on the GitHub PR interface. You can
delete the local copy of the branch with: `git branch -D branch/to-delete-name`
