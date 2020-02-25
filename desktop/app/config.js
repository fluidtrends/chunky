module.exports = ({
    "packagerConfig": {
        "icon": "assets/logo.icns"
      },
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "carmel"
          }
        },
        {
          "name": "@electron-forge/maker-dmg",
          "config": {
            "name": "chunky",
            "icon": "assets/logo.icns"
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
            "mainConfig": "./node_modules/react-electron-chunky/webpack.main.config.js",
            "renderer": {
              "config": "./node_modules/react-electron-chunky/webpack.renderer.config.js",
              "entryPoints": [
                {
                  "html": "./node_modules/react-electron-chunky/ui/index.html",
                  "js": "./node_modules/react-electron-chunky/ui/index.js",
                  "name": "main_window"
                }
              ]
            }
          }
        ]
      ]
})