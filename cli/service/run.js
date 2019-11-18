try {
    const chunky = JSON.parse(process.env.chunky)
    process.chdir(chunky.cwd)

    const executor = require(`../executors/${chunky.event.executor}`)
    executor(Object.assign({}, chunky.event.options, { service: true }))
} catch (e) {
    console.log(e)
}