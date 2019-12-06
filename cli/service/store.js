const path = require('path')
const fs = require('fs-extra')
const recursive = require("recursive-readdir")
const archiver = require('archiver')
const decompress = require('decompress')
const decompressTarbz2 = require('decompress-tarbz2')
const tar = require('tar-fs')

function zip(name, version) {
    const toolsPath = path.resolve('..', '..', 'chunky-store')
    const filename = `${name}-v${version}-${process.platform}-${process.arch}`
    
    const toolPath = path.resolve(toolsPath, filename)
    const archivedPath = path.resolve(toolsPath, `${filename}.zip`)
    
    const output = fs.createWriteStream(archivedPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    })

    archive.directory(toolPath, false)

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes')
        console.log('archiver has been finalized and the output file descriptor has closed.')
     })

    output.on('end', function() {
        console.log('Data has been drained')
    })

    archive.finalize()
      
    // const zip = new AdmZip()
    
    // recursive(toolPath, ["*.*"], function (err, files) {
    //     files.map(file => {
    //         console.log(file)
    //         // zip.addLocalFile(file)
    //     })
    //     // zip.writeZip(archivedPath)
    // })
}

function unzip(name, version) {
    const toolsPath = path.resolve('..', '..', 'chunky-store')
    const filename = `${name}-v${version}-${process.platform}-${process.arch}`
    
    const toolPath = path.resolve(toolsPath, filename, "raw")
    const archivedPath = path.resolve(toolsPath, `${filename}.tar.bz2`)
    
    fs.existsSync(toolPath) || fs.mkdirsSync(toolPath)

    const now = Date.now()
    
    console.log(archivedPath)
     
    // fs.createReadStream(archivedPath).pipe(tar.extract(toolPath))

    // var extract = tar.extract('./my-other-directory')

    return decompress(archivedPath, toolPath, { plugins: [decompressTarbz2()]})
          .then(() => {
             const total = (Date.now() - now)
             console.log('Files decompressed', (total/3600))
           })
    
}

// zip("node", "8.16.2")
unzip("cli", "1.1.1")
// unzip("node", "8.16.2")

