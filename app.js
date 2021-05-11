const {pipeline} = require('stream')
const encodeDecode = require('./lib/actions')
const options = require('./lib/options')

pipeline(
    options.inputStream,
    options.action === 'encode' ? encodeDecode.encode : encodeDecode.decode,
    options.outputStream,
    err => {
        if (err) {
            console.log('\nERROR:\n\n', err)
        } else {
            console.log('success')  
        }
    }
)





