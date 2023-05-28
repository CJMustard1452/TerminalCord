const { readToken, unsetToken } = require(`./datamodule`)
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({ intents: [IntentsBitField.Flags.MessageContent, 32767] });

function startBotInstance(readline) {

    function startQuestion() {
        readline.question('$ ', response => {
            if(response == 'exit') return process.exit(1);
            console.log(evaluate(response) + "\n");
            startQuestion();
        });
    };

    function evaluate(code) {
        try {
            return eval(code);
        } catch (error) {
            return error;
        }
    }

    client.login(readToken())
    .then(login => {
        console.log(`\n${client.user.tag} => Status: Online!\n\nStart entering code to evaluate`);
        startQuestion();
    })
    .catch(error => {
        unsetToken();
        console.log('You have entered an invalid token...');
        process.exit(1);
    });
}

module.exports = {
    startBotInstance
}