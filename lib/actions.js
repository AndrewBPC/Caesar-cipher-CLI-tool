const options = require('./options')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

async function* encode(source) {
    source.setEncoding('utf8');
    let res = ''
    for await (const chunk of source) {
        for (let i = 0; i < chunk.length; i++) {
            let character = chunk[i]
            let isUpperCase = character.toUpperCase() == character
            character = character.toLowerCase()
            if(!alphabet.includes(character)){
                res += character
                continue  
            }
            let index = alphabet.indexOf(character)
            character = alphabet[index + options.shift]
            if (alphabet[index + options.shift]) {
                if(isUpperCase) character = character.toUpperCase()
                res += character
            } else {
                shift0 = index + options.shift - alphabet.length
                character = alphabet[shift0]
                if(isUpperCase) {
                    character = character.toUpperCase()
                }
                res += character
            }
        }
        yield res
    }  
}

async function* decode(source){
    source.setEncoding('utf8');
    let res = ''
    for await (const chunk of source){
        for(let i = 0; i < chunk.length; i++){
            let character = chunk[i]
            let isUpperCase = character.toUpperCase() == character
            character = character.toLowerCase()
            if(!alphabet.includes(character)){
                res += character
                continue  
            }
            let index = alphabet.indexOf(character)
            if(alphabet[index - options.shift]){
                character = alphabet[index - options.shift]
                if(isUpperCase) character = character.toUpperCase()
                res += character
            } else{
                shiftEnd = (index - options.shift) + alphabet.length
                character = alphabet[shiftEnd]
                if(isUpperCase) character = character.toUpperCase()
                res += character
            }
        }
        yield res
    }
}

module.exports = {
    encode,
    decode
}