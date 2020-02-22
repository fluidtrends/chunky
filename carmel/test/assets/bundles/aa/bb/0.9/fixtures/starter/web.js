module.exports = (props) => ({
  layout: {
    fixed: true
  },
  permissions: {
    privateRedirect: "/me",
    publicRedirect: "/register"
  },
  footer: {
    socialMediaLinks: {
      facebook: "https://www.facebook.com/carmelio-347131802460343/",
      medium: "http://medium.com/carmelplatform",
      instagram: "https://www.instagram.com/carmel.io/",
      github: "https://github.com/fluidtrends/carmel",
      youtube: "https://www.youtube.com/channel/UCjiQXohOk0pBmJ6PFElQL-g",
      twitter: "https://twitter.com/carmelplatform",
      linkedin: "https://www.linkedin.com/company/carmel-platform/"
    },
    sections: [
      {
        title: "Get in touch",
        id: "social",
        elements: [
          {
            id: "web",
            title: "Web",
            link: "http://carmel.io"
          },
          {
            id: "twitter",
            title: "Twitter",
            link: "http://twitter.com/carmelplatform"
          },
          {
            id: "telegram",
            title: "Telegram",
            link: "http://t.me/carmelplatform"
          },
          {
            id: "medium",
            title: "Medium",
            link: "http://medium.com/carmelplatform"
          }
        ]
      }
    ]
  }
})
