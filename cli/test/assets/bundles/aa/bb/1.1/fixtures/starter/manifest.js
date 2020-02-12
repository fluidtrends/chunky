module.exports = (props) => ({
  name: props.name || "Chunky",
  env: "dev",
  id: props.id || "io.chunky",
  androidSdkDir: "~/Library/Android/sdk",
  sections: {
    start: {
      stack: ["intro"]
    }
  },
  transitions: ["replace://start"],
  provisioning: {},
  theme: {
    logoImage: "logo.gif",
    logoLightImage: "logo.gif",
    headerColor: "#FF5722",
    textColor: "#546E7A",
    linkColor: "#0288D1",
    linkHoverColor: "#64B5F6",
    linkHoverBackgroundColor: "#F5F5F5",
    progressColor: "rgba(50,50,50,0.9)",
    primaryColor: "#0097A7",
    secondaryColor: "#66BB6A",
    statusBarLight: false,
    navigationColor: "#FFFFFF",
    navigationTintColor: "#37474F",
    backgroundColor: "#999999",
    footerTintColor: "#CFD8DC",
    footerHeaderColor: "#90A4AE",
    footerColor: "#546E7A",
    footerBottomColor: "#37474F"
  },
  styles: [
    "https://fonts.googleapis.com/css?family=Roboto",
    "https://fonts.googleapis.com/css?family=Montserrat:400,700",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/font/octicons.css",
    "https://unpkg.com/antd@3.4.5/dist/antd.min.css",
    "https://unpkg.com/material-components-web@0.40.1/dist/material-components-web.css",
    "https://unpkg.com/react-placeholder@2.0.0/lib/reactPlaceholder.css",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/antd/3.4.5/antd.min.css",
    "/assets/style.css"
  ],
  scripts: [
    "https://unpkg.com/react@16/umd/react.production.min.js",
    "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/react-transition-group/2.4.0/react-transition-group.min.js",
    "https://unpkg.com/react-media/umd/react-media.min.js",
    "https://unpkg.com/react-router/umd/react-router.min.js",
    "https://unpkg.com/react-router-dom/umd/react-router-dom.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.23.0/moment.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js",
    "https://www.gstatic.com/firebasejs/4.4.0/firebase.js",
    "https://unpkg.com/material-components-web@0.40.1/dist/material-components-web.min.js",
    "https://unpkg.com/react-progressive-image@0.1.0/umd/react-progressive-image.min.js",
    "https://www.google.com/recaptcha/api.js",
    "https://js.braintreegateway.com/web/dropin/1.14.1/js/dropin.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/antd/3.4.5/antd.min.js"
  ],
  info: {
    copyright: props.copyright || "2020",
    watermark: props.watermark || "We ❤️Chunky"
  }
})
