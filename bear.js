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
        var bearname = args.join(" ").toLowerCase();
        if(!args[0]) {
            helpembeds(helpembed);
            message.channel.send(helpembed)
        }
       if (fs.existsSync(`./src/bears/${bearname}.json`)) {
           const beartype = require(`./src/bears/${bearname}.json`);
           var bearembed = new Discord.RichEmbed();

           bearembed.setTitle("Bear Information")
           .addField("Name :", beartype.name)
           .addField("Living Environment :", beartype.environment)
           .addField("Size :", beartype.size)
           .addField("Weight :", beartype.weight)
           .addField("Vulnerable :", beartype.vulnerablespecies)
           .addField("Extra Information :", beartype.extrainfo)
           .setFooter('Bear Information Bot')
           .setTimestamp();

           message.channel.send(bearembed)
}else{
    if(!args[0]) return;
    message.reply(`We couldn't find a bear called : ${bearname}`)
}
    }

    if(command === "say") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to use this!'); 
        var say = args.join(' ')
        message.channel.send(say)
    }
    if(command === "log") {
        var log = fs.readFileSync("./src/progress.md", {"encoding": "utf-8"});
          message.channel.send(log)
        }
})

client.login(run.token);

function helpembeds(helpembed) {
    helpembed.setTitle('Bear Information')
        .addField('**Polar Bear**', "+bear polarbear")
        .setFooter('Bear Information Bot')
        .setTimestamp();
}
