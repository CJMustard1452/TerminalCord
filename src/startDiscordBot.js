const fs = require('fs');
const { Client, IntentsBitField } = require('discord.js');
const bot = new Client({ intents: [IntentsBitField.Flags.MessageContent, 32767] });

module.exports = {
    async execute(readline) {

        bot.on('ready', () => {
            console.log(`\n${bot.user.tag} => Status: Online!\n`);
            evalFunction();
        })

        function evalFunction() {
            readline.question('$ ', response => {
                try {
                    if (response == 'exit') return process.exit(1);
                    const evalResponse = eval(response)
                    console.log(evalResponse)
                    console.log(' ')
                } catch (error) {
                    console.log(`There was an error with that code,\n${error}\n`);
                }
                evalFunction();
            });
        };

        bot.login(JSON.parse(fs.readFileSync('./configuration/token.json').toString()).token).catch(error => {
            fs.writeFileSync('./configuration/token.json', '{"token":false}');
            console.log('You have entered an invalid token...');
            process.exit(1);
        });
    }
}