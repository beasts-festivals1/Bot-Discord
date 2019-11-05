const discord = require('discord.js');
const bot = new discord.Client();

bot.on('ready', () =>{
    console.log('Online!')
})

bot.login(process.env.token)