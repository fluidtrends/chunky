module.exports = () => ({
  id: "personal",
  fixture: "starter",
  tags: ["personal", "branding", "starter"],
  files: {
    "package.json": "package",
    "chunky.json": "manifest",
    "web/index.json": "web",
    "web/firebase-config.json": "firebase",
    "assets/strings.json": "strings",
    "chunky.code-workspace": "vscode",
    "assets/style.css": "css",
    ".gitignore": "ignore"
  },
  data: (fixture) => {
    fixture.chunks.intro.routes.main.cover.title = "This is my personal website"
    fixture.chunks.intro.routes.main.cover.subtitle = "I built it myself"
    fixture.assets["cover.r.png"] = "https://imgur.com/download/4rUQrOC"
    return fixture
  }
})
