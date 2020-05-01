module.exports = async (workflow) => {
   return workflow.product.currentRelease.sync()
}