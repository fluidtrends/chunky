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

# 2. CLI (Developer Guide)

Chunky comes with a beautiful command line interface, packed with goodies that will help you giddy every time you fire up your terminal.

Type ```chunky``` at your favorite terminal to see *very* detailed usage instructions:

```bash
Usage:
 chunky <command> [subcommand] [options]

Commands:
  init [name]               Create a new product
  install                   Install all dependencies
  update                    Update chunky to the latest version
  start [platforms..]       Start the packagers for one or more platforms
  run [platforms..]         Run the product on one or more platforms
  report [reports..]        Run cloud reports
  transform [transforms..]  Apply cloud transforms
  reset [layers..]          Reset one or more layers of the cloud
  add [artifacts..]         Add one or more local artifact
  deploy [artifacts..]      Deploy one or more product artifacts to the cloud
  package [platforms..]     Package the product for one or more platforms
  carmel [actions..]        Interact with the Carmel Platform
```

To see even more detailed help type ```chunky help```

### The ```init``` command

Use this command to create a brand new Chunky Product. Start with a fresh directory. This command will generate all files from stratch and place them in your current working directory.

```bash
  init [name]

   Specify a custom name or go with the default generated name

  --template        The template to create the artifact from  [string] [default: "default"]
  --bundle          The product bundle where the template resides  [string] [default: "fluidtrends/chunky-bananas"]
  --------------
  --➔ Example 1.1:  chunky init MyProduct
                     ↳ Create a new product using the default template
  --➔ Example 1.2:  chunky init MyProduct --template some-template
                     ↳ Create a new product using the specified template from the default bundle
  --➔ Example 1.3:  chunky init MyProduct --template some-template --bundle some-bundle
                     ↳ Create a new product using the specified template from the specified bundle
```

When running this command, say without any arguments, here's what you would see:

```bash
——————————————————————  CREATING YOUR NEW CHUNKY PRODUCT  ——————————————————————

➡ Looking for bundle fluidtrends/chunky-bananas ...
   ✔ Found latest remote bundle fluidtrends/chunky-bananas (1.0.0)
   ✔ Using cached fluidtrends/chunky-bananas/1.0.0 bundle
➡ Looking for the personal template inside the bundle ...
   ✔ Using the personal template from the fluidtrends/chunky-bananas/1.0.0 bundle
➡ Generating product files ...
   ✔ package.json
   ✔ chunky.json
   ✔ web/index.json
   ✔ web/firebase-config.json
   ✔ assets/strings.json
   ✔ assets/style.css
➡ Generating product chunks ...
   ✔ Generated chunks indexes
   ✔ Added chunk intro, including chunk indexes
➡ Generating local product assets ...
   ✔ loader.svg
   ✔ logo.gif
   ✔ favicon/favicon.ico
   ✔ style.css
   ✔ text/intro.md
➡ Generating remote product assets ...
   ✔ Downloaded 1 remote assets

—————————————————  AMAZING! YOUR NEW CHUNKY PRODUCT IS READY!  —————————————————
```

Have a look at the file structure created and check out the [Structure Section](../structure) of the Developer Guide for a detailed walkthrough of all the files created.

---

<p align="center">
Prev: <a href="../cli"/> CLI </a>
<img src="https://raw.githubusercontent.com/fluidtrends/chunky/master/logo.gif" width="90px" style="padding: 20px">
Next: <a href="../bundles"/>Bundles</a>
</p>
