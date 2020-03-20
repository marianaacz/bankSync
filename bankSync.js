const fs = require('fs')
const bcrypt = require('bcryptjs');
const chalk = require('chalk')


let scrapedPasswords = [...fs.readFileSync('./mcupws.txt').toString().split(',')]
const hashes = [...fs.readFileSync('./bank.hash', 'utf8').toString().split('\n')]
const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


let passwords = []

// COMPARE FUNCTION
function compare(p){
    for(pws of p){
        for(hash of hashes){
            let pwFound = bcrypt.compareSync(pws, hash)
            if(pwFound){
                console.log(`${hash} -  ${pws}`)
                indexes.push(hash)
                passwords.push(pws)
                counter++
            }
         }
        for(index of indexes){
            hashes.splice(hashes.indexOf(index), 1)
        }
        indexes = []
    }
    return pws
}

// GENERATE PASSWORDS FUNCTIONS
function* oneCharPw(){
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    yield* str
}

function* twoCharPw(){
    for(let ch1 of allChars){
        for(let ch2 of allChars){
            yield `${ch1}${ch2}`
        }
    }
}

function* threeCharPw(){
    for(let ch1 of allChars){
        for(let ch2 of allChars){
            for(let ch3 of allChars){
                yield `${ch1}${ch2}${ch3}`
            }
        }
    }
}

function* fourCharPw(){
    for(let ch1 of allChars){
        for(let ch2 of allChars){
            for(let ch3 of allChars){
                for(let ch4 of allChars){
                    yield `${ch1}${ch2}${ch3}${ch4}`
                }
            }
        }
    }
}

//SCRAPED PASSWORDS 
// console.log(chalk.blue('\nComparing hashes and scraped passwords...'))
let indexes = []
let counter = 0 
compare(scrapedPasswords)
// console.log(chalk.green(`${counter} passwords matched from the scraped pws.`))

//GENERATED PASSWORDS
counter = 0
// console.log(chalk.blue('\nComparing hashes and generated passwords...'))
compare(oneCharPw())
compare(twoCharPw())
compare(threeCharPw())
compare(fourCharPw())

// console.log(chalk.green(`${counter} passwords matched from the generated pws.`))
// console.log(chalk.blue(`There were a total of ${passwords.length} passwords matched`))

// console.log(chalk.blue('Writing all matched passwords to file... '))
// console.log(hash, pwd)
// fs.writeFile('bank.hash.answer', passwords, (err) => { 
//     if (err) throw err; 
// }) 
// console.log(chalk.green('\nDone!'))


