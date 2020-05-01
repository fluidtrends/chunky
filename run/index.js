(async () => {
    const { Sync } = require('..')
    const sync = new Sync()
     
    try {
        const [,, task, productName] = process.argv
        await sync.run({ task, productName })
    } catch (e) {
        console.error(e.message)
    }
})()
