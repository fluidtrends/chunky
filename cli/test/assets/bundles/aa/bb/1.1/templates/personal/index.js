module.exports = () => ({
  id: "personal",
  fixture: "unknown",
  tags: ["personal", "branding", "starter"],
  data: (fixture) => {
    fixture.chunks.intro.routes.main.cover.title = "This is my personal website"
    fixture.chunks.intro.routes.main.cover.subtitle = "I built it myself"
    fixture.assets["cover.r.png"] = "https://imgur.com/download/4rUQrOC"
    return fixture
  }
})
