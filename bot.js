const discord = require('discord.js');
const ytdl = require('ytdl-core')


const bot = new discord.Client();

const PREFIX = '$'

bot.on('ready', () =>{
    console.log('Online!')
})

var servers = {};

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                })
            }

            if(!args[1]){
                message.channel.send("Please provide a valid link!");
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send("Please join the music channel to have access to play music!")
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            })






        break;
    }
})

bot.login(process.env.token)