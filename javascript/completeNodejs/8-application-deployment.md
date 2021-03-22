---
title: "Application Deployment"
part: 8
date: "2019-11-27"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# Application Deployment

## SSH Connection

Applications like GitHub and Heroku allow an SSH connection. To set this up, do the following:

1. Run `ssh-keygen -t rsa -b 4096 -C "dan@danfitz.com"` to create an RSA public and private key pair.
   * `-t rsa` defines the algorithm.
   * `-b 4096` is the most common byte size.
   * `-C "dan@danfitz.com"` is the comment, which is usually your email.
2. Save the key pair to the default location: `~/.ssh`. Also, set the passphrase to a default of none. This will generate an RSA public and private key pair: `id_rsa` and `id_rsa.pub`.
3. Start up a new SSH agent: `eval "$(ssh-agent -s)"`. This will create a new agent or give you the ID of the one already running.
4. Add the private key to the SSH agent: `ssh-add ~/.ssh/id_rsa`.
5. In your service of choice, add the contents of the public key in the `id_rsa.pub` file to your account. (Just use `cat` to print it out.)

### GitHub

The value of SSH with GitHub is that you can connect without a username and password! To test that GitHub is authenticated, run `ssh -T git@github.com`. You should see a success message!

### Heroku

Heroku allows configuration in the command line.

1. Run `heroku keys:add`, and it will find `id_rsa.pub` automatically.
2. Then run `heroku create <appName>` to create new app.
3. Now Heroku needs an `npm start` command, which it will execute on the server. Simply add this inside `scripts` in `package.json`:
   * `"start": "node path/to/app.js"`
4. Heroku provides your server with its own port environment variable, so you need to add it to your `app.listen` function call.

```js
const port = process.env.PORT || 3000
// NOTE: You provide a fallback value for the local dev environment

app.listen(port, ...)
```

**Note**: Make sure any URLs for other parts of your site use a relative path (e.g. `/about` instead of `localhost:3000/about`).

5. Finally, stage and commit your code and then `git push heroku master`. Heroku will deploy your application for you!

## Avoid Global Modules

If you have a global module, this is bad for other people who want to work on your project. When they `git clone` your project and then `npm install` your dependency modules, global modules aren't included in your `package.json`. The solution is to add the module as a local module!

**Bonus**: Some of these local modules will be **dev dependencies**. These dependencies are separated, so the production server doesn't install unnecessary files. For example, `nodemon` is useful for a dev to hot reload your local website, but it's useless in a production environment. To implement a dev dependency, do the following:
* Simply flag your install as `npm install --save-dev nodemon`.
* Then make sure any scripts your deployment server runs *don't* include dev dependencies.

**Note**: If you want to run a command in the command line using a local module, you can use `npx` like `npx nodemon src/app.js`.