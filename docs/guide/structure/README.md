<p align="center"> <img src="https://raw.githubusercontent.com/fluidtrends/chunky/master/logo.gif" width="256px"> </p>
<h1 align="center"> Chunky </h1>

<h3 align="center"> The Happy Code Monkey That Helps You Write Swear-Free Code. </h3>

<p align="center"> Chunky is a Full Stack Low-Code Product Development Platform for
novice and seasoned developers who want to build, launch and grow End-To-End Digital Products without swearing at their code. </p>

<p align="center">
<a href="../start/README.md"> Quick Start </a> |
<a href="../features/README.md"> Feature Tour </a> |
<a href="../examples/README.md"> Real Examples </a> |
<strong> Developer Guide </strong> |
<a href="../contrib/README.md"> Get Involved </a>
</p>

<hr/>

<p align="center">
<a href="https://circleci.com/gh/fluidtrends/chunky"><img src="https://circleci.com/gh/fluidtrends/chunky.svg?style=svg"/></a>
<a href="https://codeclimate.com/github/fluidtrends/chunky/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f6621e761f82f6c84f40/test_coverage" /></a>
<a href="https://codeclimate.com/github/fluidtrends/chunky/maintainability"><img src="https://api.codeclimate.com/v1/badges/f6621e761f82f6c84f40/maintainability"/></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/chunky-cli">
<img src="https://img.shields.io/npm/v/chunky-cli.svg?color=green&label=CLI&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-chunky">
<img src="https://img.shields.io/npm/v/react-chunky.svg?color=green&label=universal&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-dom-chunky">
<img src="https://img.shields.io/npm/v/react-dom-chunky.svg?color=green&label=web&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-cloud-chunky">
<img src="https://img.shields.io/npm/v/react-cloud-chunky.svg?color=green&label=cloud&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-native-chunky">
<img src="https://img.shields.io/npm/v/react-native-chunky.svg?color=blue&label=mobile&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-electron-chunky">
<img src="https://img.shields.io/npm/v/react-electron-chunky.svg?color=blue&label=desktop&style=flat-square"/></a>
<a href="https://www.npmjs.com/package/react-blockchain-chunky">
<img src="https://img.shields.io/npm/v/react-blockchain-chunky.svg?color=blue&label=blockchain&style=flat-square"/><a/>
</p>

---

# 1. Structure (Developer Guide)

A Chunky Product is a complete [Node Module](https://docs.npmjs.com/about-packages-and-modules), including a ```package.json``` file. To create a brand new Chunky Product, use the [init](#the-init-command) CLI command. In addition to the ```package.json``` file, all Chunky Products include at least the following:

* A ```chunky.json``` file
* A ```chunks/``` folder
* An ```assets/``` folder
* A ```web/**``` folder

The following folders can also be present, but not always:

* An ```ios/``` folder
* An ```android/``` folder
* A ```desktop/``` folder
* A ```blockchain/``` folder

Let's go through these one by one.

*Check out the full [Carmel source code](https://github.com/fluidtrends/carmel)* for a real world example of what a Chunky Product structure looks like.

### The ```chunky.json``` file

Just like the ```package.json``` file acts as the manifest of a Node Module, so too does the ```chunky.json``` file act as the manifest for a Chunky Product. The format is [JSON](https://www.json.org/) and it comprises a few key nodes that are worth mentioning here.

*Check out [the Carmel ```chunky.json``` file](https://github.com/fluidtrends/carmel/blob/master/chunky.json) for a real example in action.*

**```name```** *string*

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L2):

```
name: Carmel
```

This is the name of the Chunky Product represented by the ```chunky.json``` manifest file. This name will be used everywhere and anywhere the product is mentioned, from documentation to packaging and even file names.

**```env```** *string*

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L4):
```
env: production
```

The current environment is represented by this element and it is used primarily when the product is packaged and/or published. The environment is especially useful when publishing cloud functions. The commonly used values are: **production** and **development** but you can add other environments, such as **staging** or **baby unicorns**. Just sayin'.

**sections** *object*

Alright, here we go. This is getting serious now. Chunky comes with a cool feature we call **sectioning** where we can group chunks in sections. Normally, one sections would be more than enough but you can add more. For example, you could add a section that holds all your public facing views and one for all your private ones. Pretty neat, eh?

Each section has a key, which acts as the id of the section. Inside each section, you can define a ```stack``` of chunks, a ```layout``` (*sidebar* or leave empty for default) and you can specify whether the section is ```private``` or not.

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L7-L25):

```
"sections": {
  "start": {
    "stack": [
      "intro",
      "learn",
      "tokens",
      "story",
      "community",
      "auth",
      "journey",
      "payments"
    ]
  },
  "dashboard": {
    "private": true,
    "layout": "sidebar",
    "stack": ["payments", "learn", "tokens", "auth"]
  }
}
```

**provisioning**

This is where you can tell Chunky where to look for remote services, including your custom RESTful API.

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L27-L31):

```
"provisioning": {
  "rest": {
    "url": "https://api.carmel.io"
  }
}
```

**theme**

Use the ```theme``` element to specify look and feel attributes, such as fonts, colors and and image names. These get automatically injected into your screens so you can use theme using the ```this.props.theme``` property.

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L35-L58):

```
"logoImage": "carmel-logo-white.png",
"logoLightImage": "carmel-logo.png",
"headerColor": "#FF5722",
"textColor": "#546E7A",
"linkColor": "#0288D1",
"linkHoverColor": "#64B5F6",
"linkHoverBackgroundColor": "#F5F5F5",
"progressColor": "rgba(50,50,50,0.9)",
"primaryColor": "#00bcd4",
"secondaryColor": "#00BFA5"
...

```

**info**

Product wide information such as copyright info go here so that Chunky can find it all and retrieve all this info when it needs it

[Example](https://github.com/fluidtrends/carmel/blob/master/chunky.json#L85-L95):

```
"info": {
  "copyright": "© 2019",
  "title": "Carmel",
  "summary": "The Decentralized Tech Education Platform",
  "watermark": "Created with Chunky.",
  "cover": "chris.r.png",
  "analytics": {
    "type": "google",
    "key": "UA-99031266-1"
  }
}
```

### The ```chunks/``` folder

The bread and butter of every Chunky Product is its chunks. A Chunky chunk (that's gotta make you smile) - is an independent full stack unit of the entire product.

Have a look at the [Carmel auth chunk](https://github.com/fluidtrends/carmel/tree/master/chunks/auth) and take a look at its structure.

Each Chunky chunk has a ```chunky.json``` descriptor, much like every Chunky product has a ```chunky.json``` manifest file. You will also see an ```index.json``` and an ```index.web.json``` file. The former is the mobile app entry point into the chunk while the latter is the web counterpart. You might also see a ```index.desktop.json``` entry point for the desktop app.

*You don't want to change the content of these index files.*

They perform a perfectly simple job and they do it well. They bootstrap the chunk for the right platform (web, mobile or desktop) and expose the chunk's screens and configuration from the ```chunk.json``` descriptor.

Then you will notice the ```screens/``` folder and potentially the ```components/``` and the ```functions/``` folders if the chunk exposes components or functions.

Screens in the ```screens/``` folder are platform specific, like the index files.

The crucial part with the screens is that they need to extend the particular core screen from the appropriate Chunky framework. So web screens for example, extend the [Core Screen](https://github.com/fluidtrends/chunky/blob/master/web/src/core/Screen.js) from the [Chunky Web Framework](https://github.com/fluidtrends/chunky/blob/master/web).

In addition to that, the screens have to be exported in the screen index file. See the auth web screen for example,
In addition to that, the screens have to be exported in the screen index file. See the [Carmel auth web screen index](https://github.com/fluidtrends/carmel/blob/master/chunks/auth/screens/index.web.js#L1) for example.

*Check out the [Carmel chunks](https://github.com/fluidtrends/carmel/tree/master/chunks) for what a ```chunks/``` folder looks like in action.*

### The ```assets/``` folder

### The ```web/``` folder

### The ```ios/``` folder

### The  ```android/``` folder

### The ```desktop/``` folder

### The  ```blockchain/``` folder
