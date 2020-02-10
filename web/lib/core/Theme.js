"use strict";

var Main = function Main(_) {
  return "\n:root {\n    font-family: Roboto Condensed, sans-serif;\n}\n\nhtml {\n    font-weight: 300;\n    font-family: Roboto Condensed, sans-serif;\n    color: #ffffff;\n}\n\npre {\n    background-color: #F5F5F5;\n    color: #455A64;\n    text-align: left;\n    padding: 20px;\n    width: 90%;\n}\n\n.text {\n    text-align: left;\n}\n\na {\n    text-decoration: none;\n}\n\nh1 {\n    background-color: ".concat(_.color, ";\n    font-weight: 300;\n    font-size: ").concat(_.header, "px;\n    text-align: center;\n}\n\nh2 {\n    font-weight: 300;\n    font-size: 32px;\n    text-align: center;\n}\n\nh3 {\n    font-weight: 300;\n    font-size: 24px;\n    text-align: left;\n}\n\np {\n    font-size: 20px;\n    text-align: justify;\n}\n\ncode {\n    font-size: 14px;\n    background-color: #212121;\n    padding: 20px;\n    color: #00C853;\n    display: flex;\n    text-align: left;\n    flex: 1;\n}\n\np.text {\n    font-size: 20px;\n    text-align: justify;\n}\n\n.transition-enter {\n    opacity: 0.01;\n}\n\n.transition-enter.transition-enter-active {\n    opacity: 1;\n    transition: opacity 500ms ease-in;\n}\n\n.transition-exit {\n    opacity: 1;\n}\n\n.transition-exit.transition-exit-active {\n    opacity: 0.01;\n    transition: opacity 300ms ease-in;\n}");
};

module.exports = {
  Main: Main
};