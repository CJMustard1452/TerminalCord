const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const { startBotInstance } = require(`./resources/discordinstance`);
const { hasToken, writeToken } = require('./resources/datamodule');

if(!hasToken()) readline.question('Please enter a DISCORD bot token.\n$ ', response => {
    writeToken(response);
    startBotInstance(readline);
});
else readline.question('Please enter your new discord token here, press enter to continue with registered token.\n$ ', response => {
    if(response) writeToken(response);
    startBotInstance(readline);
});
