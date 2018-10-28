const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const http = require('http');
const config = require('./config.json')
const run = require('./run.json');
const bear = require('./bear.js')

//Glitch Hosting

/*app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
      });
     app.listen(process.env.PORT);
      setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
      }, 280000);
*/

client.on("ready", () => {
    console.log('Index Ready!');
    client.user.setStatus('Online')
    client.user.setActivity('WIP - Contact Josia50')
})

client.login(run.token);
