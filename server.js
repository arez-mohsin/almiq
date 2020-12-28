
const { Client, MessageEmbed } = require("discord.js");
var { Util } = require("discord.js");
const client = new Client({ disableEveryone: true });
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const botversion = require("./package.json").version;
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const ms = require("ms");
const jimp = require("jimp");
const math = require("math-expression-evaluator");
const { get } = require("snekfetch");
const guild = require("guild");

const dateFormat = require("dateformat");
var table = require("table").table;
const Discord = require("discord.js");
const cmd = require("node-cmd");
const prefix = "a!";
client.login("NzYxNzc3ODI5NjI0Njc2MzYy.X3fi4w.u3khRPGkd1ZDOuCP1nFIg2NtyX8");
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setStatus("idle");
  client.user.setActivity(`${prefix}help`, { type: "PLAYING" });
  client.guilds.cache.forEach(g => {
    if (g.member(client.user).hasPermission("ADMINISTRATOR")) {
      g.fetchInvites().then(guildInvites => {});
    }
  });
});

//////////

client.on("message", async message => {
  if (message.content.startsWith(prefix + "help")) {
    let help = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(message.guild.iconURL)
    
      .setDescription(`
      
  

━──╮•╭──━
⌖| Security
> anti ban [Number]
> anti kick [Number]
> anti channel [Number]
> anti role [Number]
> antibot [on / off]
━──╮•╭──━
⌖| Public
> bot , server , ping , profile , uinvites , hightRole , nick
> user , avatar , roles , emoji
━──╮•╭──━
⌖| Moderation
> , ban , kick , mute , unmute , slowmode , bans
> say , unban[userid/all]
━──╮•╭──━

__ [Invite]("https://discord.com/api/oauth2/authorize?client_id=740305582145405051&permissions=8&scope=bot") __  
__ [Support](https://discord.gg/bFbr4cQRSh) __

`);
    message.channel.send(help);
  }
});