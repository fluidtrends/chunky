const path = require('path')

const dir = path.dirname(__dirname)
const cwd = process.cwd()

const props = {
  name: "chunky"
}

module.exports = ({
    "packagerConfig": {
        "icon": path.resolve(cwd, "assets", "logo.icns")
      },
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": props.name
          }
        },
        {
          "name": "@electron-forge/maker-dmg",
          "config": {
            "name": props.name,
            "icon": path.resolve(cwd, "assets", "logo.icns")
          }
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ],
      "plugins": [
        [
          "@electron-forge/plugin-webpack",
          {
            "mainConfig": path.resolve(dir, "app", "webpack.main.config.js"),
            "renderer": {
              "config":  path.resolve(dir, "app", "webpack.renderer.config.js"),
              "entryPoints": [
                {
                  "html": path.resolve(dir, "ui", "index.html"),
                  "js": path.resolve(dir, "ui", "index.js"),
                  "name": "main_window"
                }
              ]
            }
          }
        ]
      ]
})