const asset = (filepath) => {
    var main
    try {
        main = require(`__app/assets/${filepath}`)
    } catch (e) {
        main = require(`../assets/${filepath}`)
    } 

    return main || require(`../assets/icon.png`)
}

export default asset