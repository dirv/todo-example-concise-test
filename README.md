# todo-example-concise-test

An example codebase that's used in the book [Build Your Own Test Framework](https://leanpub.com/byo-test/) (still a work in progress!).


## TorontoJS setup instructions

Hello! 👋

If you're joining the workshop on Dec 10, 2019, you can get a headstart by following these instructions. The four steps are:

- [ ] Upgrade to (or install) Node version 13.2
- [ ] Fork this repo and clone it to your local machine
- [ ] Create a new test runner project and link it
- [ ] Read the session overview section below

### Upgrade to (or install) Node version 13.2

This workshop uses ES6 modules which are on by default from Node 13.2. To check which version, you're on, open a command line and type:

``` sh
node -v
```

If Node isn't found, you'll need to install it. If the version is old, please consider upgrading.

Some of you may not wish to upgrade, which is totally fine, however if you're on anything less than 13.2, you'll need to use the `--experimental-modules` flag with every Node command.

### Fork this repo and clone it to your local machine

There's no requirement to fork as this repo isn't the one we'll be doing the most work in.

``` sh
git clone https://github.com/dirv/todo-example-concise-test.git
```

During the workshop we'll be modifying the file `test/tests.js`. 

### Create a new test runner project

Most of the workshop will be writing code in a new NPM library. You can get a head start by doing all the plumbing beforehand.

 1. Open a terminal in your local workspace.
 2. `mkdir concise-test`
 3. `cd concise-test`
 4. `npm init` -- then fill in all the blanks
 5. `mkdir src test`
 6. Open package.json and add the following two lines:
 
 ```javascript
    "type": "module",
    "bin" : "./src/cli"
 ```
 
### Link the projects

The `todo-example-concise-test` project makes use of this new library you'll be building, so we need to link the two so it can be accessed.

Starting in the project folder of `concise-test` that you created in the last step...

 1. `npm link` -- this makes it available in your local package repo
 2. Change directory to the previous repo, e.g. `cd ../todo-example-concise-test`
 3. `npm link concise-test`

That's it.

### Overview

This workshop we'll be building out *both* the `todo-example-concise-test` and `concise-test` projects.

The `todo-example-concise-test` project is like our scaffold, and will allow us to manually test the constructs we make in `concise-test`. As we build more and more features into `concise-test`, we'll update `concise-test-todo-example` to use those features.

You can see where we're going to end up by looking at the `with-concise-test` branch of this repo.
