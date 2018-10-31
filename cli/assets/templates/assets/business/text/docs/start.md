## Create Your First Chunky Product In Minutes.

Getting started with Chunky is a breeze.

Before we do that though, let's make sure your development machine is ready.

If you've developed JavaScript apps before that means your development environment is up and running and you should be ready to go right away.

Otherwise, you'll need to go through the prerequisites below first.

Don't worry, this will be fun.

## Prerequisites

**A Code Editor**

This one's pretty obvious. As a Software Developer, this is where you live most of the time. In your **Code Editor**.

It doesn't really matter what Code Editor you use, just make sure it's one that you enjoy using.

Check out **Atom** if you want a good Code Editor.

[Download Atom](http://atom.io)

**A Terminal**

Make sure you have your favorite terminal handy, because you're going to need it often.

Your development machine, whether a Mac, Windows or Linux, should have a built-in terminal. So in theory, you shouldn't have to do anything if you just want to use the default terminal.

You can also use whatever terminal you prefer, just make sure you have one handy.

Check out **Hyper.js** if you want a good terminal recommendation.

[Download Hyper.js](https://nodejs.org/en/download/)

**Node.js**

The Chunky CLI is built with Node.js so you need to make sure Node.js version 6 or higher is installed on your machine, before attempting to install the Chunky CLI.

If you don't have **Node.js** installed on your machine, simply download the latest stable version and run the installer.

[Download Node.js](https://nodejs.org/en/download/)

**Windows Build Tools (Windows Only)**

If your running Windows, the Chunky CLI also needs to have access to the Windows Build Tools. To install them, just run the following command in your terminal:

```
npm i -g windows-build-tools
```

## Installing The Chunky CLI

In addition to being a cute code monkey, Chunky is also a big terminal nerd.

Meaning, your primary gateway to Chunky is the **Chunky Command-Line Interface (CLI)**.

Installing the **Chunky CLI** on your development machine is a one-liner. Just open up your terminal and run the following command:

```
npm i -g react-chunky-cli
```

That's it. Welcome to Chunky. You now have the mighty ```chunky``` command available at your fingerprints.

Say Hello and try it out by typing it in your terminal:

```
chunky
```

## Your First Chunky Product

That's all good and awesome but let's see Chunky in action.

Let's create a brand new Chunky Product.

All you have to do is run the ```init``` command like so:

```
chunky init --name Hello
```

Go ahead an look in your current directory. Chunky just initialized a new product for you.

Typically you would look through those files, especially the Chunky Manifest, ```chunky.json``` and configure settings to your liking.

For now, let's go ahead with the default configuration.

Next, we want to install a Chunky Product Template, using the ```install``` command.

Let's just install the default template, as follows:

```
chunky install
```

If you look through the generated files, you'll notice a lot of new additions.

You're looking at a full blown Full Stack Product.

One more step. Let's install our product's dependencies.

Nothing fancy here, just run:

```
npm i
```

Depending on your network connection, this could take a couple of minutes. Let it run and when it's done, pat yourself on the back.

You are the owner of a brand new Chunky Product.

## See Your Product In Action

To see what your product looks like, let's just start the Web App in development mode, like so:

```
chunky start web
```

Let the packager do its thing for a few seconds and then just open your browser to ```localhost:8082``` and have a look at your brand new Web App.

You can go ahead now and edit your product, extend it, package it, deploy it and so much more.
