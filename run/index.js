(async () => {
    const workflows = require('../src/workflows')
    const Workflow = workflows[process.argv.length > 2 ? process.argv[2] : 'main'] || workflows.main

    try {
        const workflow = new Workflow({ })
        await workflow.run()
    } catch (e) {
        console.log(e)
    }
})()
