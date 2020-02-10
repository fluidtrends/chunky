const Main = (_) => `
:root {
    font-family: Roboto Condensed, sans-serif;
}

html {
    font-weight: 300;
    font-family: Roboto Condensed, sans-serif;
    color: #ffffff;
}

pre {
    background-color: #F5F5F5;
    color: #455A64;
    text-align: left;
    padding: 20px;
    width: 90%;
}

.text {
    text-align: left;
}

a {
    text-decoration: none;
}

h1 {
    background-color: ${_.color};
    font-weight: 300;
    font-size: ${_.header}px;
    text-align: center;
}

h2 {
    font-weight: 300;
    font-size: 32px;
    text-align: center;
}

h3 {
    font-weight: 300;
    font-size: 24px;
    text-align: left;
}

p {
    font-size: 20px;
    text-align: justify;
}

code {
    font-size: 14px;
    background-color: #212121;
    padding: 20px;
    color: #00C853;
    display: flex;
    text-align: left;
    flex: 1;
}

p.text {
    font-size: 20px;
    text-align: justify;
}

.transition-enter {
    opacity: 0.01;
}

.transition-enter.transition-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
}

.transition-exit {
    opacity: 1;
}

.transition-exit.transition-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
}`

module.exports = { Main }
