const discord = require('discord.js');
const ytdl = require('ytdl-core')


const bot = new discord.Client();

const PREFIX = '$'

bot.on('ready', () =>{
    console.log('Online!')
    bot.user.setActivity('Minor Citizens | $help');
    bot.user.setStatus('dnd');
})

var servers = {};

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    if(message.content.startsWith('$help')){
        const helpembed = new discord.RichEmbed()  
        helpembed.setTitle('Help Page!')
        helpembed.addField('$hamachi', 'Displays the Hamachi Network Name and Password');
        helpembed.addField('$ip','Shows you the current IP to log on');
        helpembed.addField('$help', 'Shows the help page');  
        helpembed.addField('$staff', 'Shows you the current Staff Team');
        helpembed.addField('$trailer', 'Sends you the link to watch the official Minor Citizens trailer');
        helpembed.addField('$mods', 'Sends you the link to download all the mods for Minor Citizens');
        helpembed.addField('$profile', 'Views your profile');
        helpembed.addField('$updates', 'View the latest updates for Minor Citizens')
        helpembed.setFooter('For staff commands type $shelp');
        helpembed.setColor(0xFFC300)
        message.channel.send(helpembed)
    }

    if(message.content.startsWith('$enableoffline')){
        bot.user.setStatus('invisible');
        message.channel.send('Fake offline enabled!')
    }

    if(message.content.startsWith('disableoffline')){
        bot.user.setStatus('dnd');
        message.channel.send('Fake offline disabled!')
    }
})

bot.login(process.env.token)