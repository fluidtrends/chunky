const Workflow = require('../Workflow')

const dashboardSheetId = "1ZT0Ab2K7mkUpl3yY7UD9kXOXar8PZ1Q5d1nww_R27Mw"
const releaseName = "Almaren"

class _ extends Workflow {
    constructor(props) {
        super(Object.assign({}, props, { id: 'main' }))
    }

    async run() {
        await super.run()
        const milestones = await this.services.github.milestones(this.index.carmel.github)
        console.log(milestones)
        const rows = await this.services.google.sheetData(dashboardSheetId, `${releaseName}!B2:F202`)
       
        const description = 

        sheetData.map(row => {
            console.log(row)
        })
    }
}

module.exports = _