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

Heroku allows configuration in the command line. Just run `heroku keys:add`, and it will find `id_rsa.pub` automatically.