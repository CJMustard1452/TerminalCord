const fs = require('fs');

function hasToken() {
    if (!fs.existsSync(`./configuration/tokenstorage.json`)) {
        fs.writeFileSync('./configuration/tokenstorage.json', '{}')
        return false;
    } else if(JSON.parse(fs.readFileSync('./configuration/tokenstorage.json'))['token']) return true;
    else return false;
}

function writeToken(token) {
    fs.writeFileSync('./configuration/tokenstorage.json', JSON.stringify({"token": token}))
}

function unsetToken() {
    fs.writeFileSync('./configuration/tokenstorage.json', '{}')
}

function readToken() {
    return JSON.parse(fs.readFileSync('./configuration/tokenstorage.json')).token
}

module.exports = {
    hasToken,
    writeToken,
    readToken,
    unsetToken
}