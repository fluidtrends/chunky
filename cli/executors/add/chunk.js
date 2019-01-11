const generators = require('../../src/generators')

function create(name, template) {
    return generators.generateChunk(name, template)
}

module.exports = { create }
