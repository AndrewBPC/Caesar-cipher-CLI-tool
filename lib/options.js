const { Command } = require('commander')
const programm = new Command()
const fs = require('fs')


        programm.option('-s, --shift <shift>', 'a shift')
                .option('-i, --input <file>', 'an input file')
                .option('-o, --output <file>' , 'an output file')
                .option('-a, --action <action>', 'an action encode/decode')

        programm.parse(process.argv)
        const options = programm.opts()
        options.shift = Number(options.shift)

        if (!((options.action === 'decode' | options.action === 'encode') && options.shift >= 0)) {
                process.stdout.write('there is no argument or not full\n')
                process.exit(-1)
        }
        try {
                fs.accessSync(options.input, fs.R_OK)
                options.inputStream = fs.createReadStream(options.input)
        } catch (e) {
                process.stderr.write('Error: cannot read input file\n')
                options.inputStream = process.stdin
        }
        try {
                fs.accessSync(options.output, fs.W_OK)
                options.outputStream = fs.createWriteStream(options.output)
        } catch (e) {
                process.stderr.write('Error: cannot wrtie to output file\n')
                options.outputStream = process.stdout
        }



module.exports = options