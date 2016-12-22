'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('¡Hola soy el Bot de Konfio!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('¿Cómo te llamas?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Bien te llamaré ${name}
¿Esta bien? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
