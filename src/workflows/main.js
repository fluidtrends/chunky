const Workflow = require('../Workflow')

class _ extends Workflow {
    constructor(props) {
        super(Object.assign({}, props, { id: 'main' }))
    }

    async run() {
        await super.run()
        const milestones = await this.services.github.milestones(this.index.carmel.github)
        console.log(milestones)
    }
}

module.exports = _