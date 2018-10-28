const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const http = require('http');
const config = require('./config.json')
const run = require('./run.json');
const fs = require('fs')

client.on("message", async message => {
    if (message.guild === null) return;
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    var helpembed = new Discord.RichEmbed();

    var pbearembed = new Discord.RichEmbed();
    var pbeartext = fs.readFileSync("./src/bears/polarbear", {encoding: "utf-8"});

    pbearembed.setTitle('**Polar Bear**')
    .setDescription(pbeartext)
    .setFooter('Bear Information Bot')
    .setTimestamp()


    if(command === "bear") {
        if(!args[0]) {
            helpembeds(helpembed);
            message.channel.send(helpembed)
        }
        if(args[0] == "polarbear") {
          message.channel.send(pbearembed)
        }
    }

    if(command === "say") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to use this!'); 
        var say = args.join(' ')
        message.channel.send(say)
    }
})

client.login(run.token);

function helpembeds(helpembed) {
    helpembed.setTitle('Bear Information')
        .addField('**Polar Bear**', "+bear polarbear")
        .setFooter('Bear Information Bot')
        .setTimestamp();
}
