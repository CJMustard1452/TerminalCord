const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');

if (!fs.existsSync('./configuration')) fs.mkdirSync('./configuration');
if (!fs.existsSync('./configuration/token.json')) fs.openSync('./configuration/token.json', 'w') && fs.writeFileSync('./configuration/token.json', '{"token":false}');
if (!JSON.parse(fs.readFileSync('./configuration/token.json').toString())['token']) return askTokenFirst();
if (JSON.parse(fs.readFileSync('./configuration/token.json').toString())['token']) return askTokenSecond();

function askTokenFirst() {
    readline.question('Please enter a DISCORD bot token.\n$ ', response => {
        fs.writeFileSync('./configuration/token.json', `{"token":\"${response}\"}`);
        require('./src/startDiscordBot').execute(readline);
    });
}

function askTokenSecond() {
    readline.question('Please enter your new discord token here, press enter to continue with registered token.\n$ ', response => {
        if (!response) return require('./src/startDiscordBot').execute(readline);
        else fs.writeFileSync('./configuration/token.json', `{"token":\"${response}\"}`) && require('./src/startDiscordBot').execute(readline);
    });
}
