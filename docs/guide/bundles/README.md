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

# 3. Bundles (Developer Guide)

One of the beautiful things about Chunky is that it's not only modular but also highly *extensible*.

You already know about chunks, and sure that's the primary way to build functionality. But, in addition to chunks, there are also *product templates*. Just like you can build a cross-functional piece of a product as a chunk, you can build an entire product template.

Product templates are based on *product fixtures*, which you can think of as a foundational base for a template.

Chunks, templates and fixtures can be bundled up and shared in **bundles**. Chunky comes with a default bundle called
[Chunky Bananas](https://github.com/fluidtrends/chunky-bananas) which includes a starter kit to get you going right away. Take a look at the bundle and give the following a good read:
* template: [personal](https://github.com/fluidtrends/chunky-bananas/tree/master/templates/personal)
* fixture: [starter](https://github.com/fluidtrends/chunky-bananas/tree/master/fixtures/starter)
* chunk: [intro](https://github.com/fluidtrends/chunky-bananas/tree/master/chunks/intro)

**Creating a bundle**

Extending Chunky with your own chunks, fixtures or templates, all you have to do is create a GitHub repository and follow the layout of [Chunky Bananas](https://github.com/fluidtrends/chunky-bananas) bundle.

Once you do that, in order to make sure the bundle is ready to be used, create a release with a version number. Have a look at the [Chunky Bananas 1.0.0 release](https://github.com/fluidtrends/chunky-bananas/releases/tag/1.0.0).

**Using bundles**

Templates come in very handy when creating a new product with the ```init``` CLI command line. Read the [init command guide](../cli#the-init-command) for details on how create a product using a custom template.

---

<p align="center">
<img src="https://raw.githubusercontent.com/fluidtrends/chunky/master/logo.gif" width="64px"/>
<br/>
Keep going to the <a href="../web"/>Web Framework Guide</a> or <a href="../cli"/>go back</a>.
</p>
