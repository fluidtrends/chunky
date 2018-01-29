const firebase = require("firebase-admin")
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs-extra')
const coreutils = require('coreutils')
const firebaseline = require('firebaseline')
const json2xls = require('json2xls')

function executeOperations(providers, args) {
  return firebaseline.operations.retrieve(providers.firebase.api, args)
}

function saveReportResult(report, result) {
  const reportDir = path.resolve(process.cwd(), "chunks", report.chunk, "reports")
  const excelFile = path.resolve(reportDir, report.name + '.report.xlsx')
  const yamlFile = path.resolve(reportDir, report.name + '.report.yaml')

  saveReportResultAsExcel(report, result, excelFile)
  // saveReportResultAsYaml(report, result, yamlFile)
}

function saveReportResultAsYaml(report, result, reportFile) {
  const content = yaml.safeDump(result)
  fs.writeFileSync(reportFile, content)
}

function saveReportResultAsExcel(report, result, reportFile) {
  var data = []
  result.forEach((instance, index, record) => {

    var item = {}
    const fields = Object.keys(record[index])

    fields.forEach(field => {
      var value = record[index][field]

      if (Array.isArray(value)) {
        for(var i = 1; i < value.length; i=i+1) {
          var friendlyOutput = value[i]
          if ("object" === typeof friendlyOutput) {
            friendlyOutput = ""
            for(const friendlyKey in value[i]) {
              friendlyOutput = friendlyOutput + "[" + friendlyKey + "]: " + value[i][friendlyKey] + " \r\n"
            }
          }
          item[field + " (" + i + ")"] = friendlyOutput
        }
        return
      }

      if ("object" === typeof value) {
        for(const friendlyKey in value) {
          item[field + " (" + friendlyKey + ")"] = value[friendlyKey]
        }
        return
      }

      item[field] = value
    })

    data.push(item)
  })

  fs.writeFileSync(reportFile, json2xls(data), 'binary')
}

function batchNextOperations(providers, groups, report) {
    if (!groups || groups.length === 0) {
        return Promise.resolve()
    }

    const nextGroup = groups[0]
    const nextArgs = report.data[nextGroup]

    if (!nextArgs || nextArgs.length === 0) {
        throw new Error(`Missing ${group} arguments`)
    }

    return executeOperations(providers, nextArgs).
        then(result => {
           coreutils.logger.ok(`Finished ${nextGroup} operations`)
           saveReportResult(report, result)
           return batchNextOperations(providers, groups.slice(1), report)
        }).
        catch(error => {
           coreutils.logger.skip(`Skipped ${nextGroup} operations (${error.message})`)
        })
}

function performChunkOperations(providers, report) {
    const groups = Object.keys(report.data)
    return batchNextOperations(providers, groups, report)
}

function runReports(providers, reports) {
    if (!reports || reports.length === 0) {
        return Promise.resolve()
    }

    const nextReport = reports[0]

    coreutils.logger.info(`Running the ${nextReport.chunk} ${nextReport.name} report ...`)
    return performChunkOperations(providers, nextReport).then(() => {
        coreutils.logger.done()
        return runReports(providers, reports.slice(1))
    })
}

module.exports = runReports
