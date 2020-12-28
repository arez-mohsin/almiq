const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://earthbotdus.glitch.me/`);
}, 280000);



const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');
var { Util } = require('discord.js');
const fs = require("fs");
const pg = require("pg");
const client = new Discord.Client();
const bot = new Discord.Client();
const botname = "Earth Bot";
const ms = require("ms");
const cd = require('countdown');
const db = require('to-time');
const moment = require("moment");
const bettersqlitepool = require('better-sqlite-pool');
const jimp = require ("jimp");
const pretty = require("pretty-ms");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const util = require("util");
const queue = new Map();
const enmap = require('enmap');
const ytdl = require("ytdl-core");
const xp = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
const profile = JSON.parse(fs.readFileSync("profile.json", "utf8"));
var prefix = ".";
var prfs = ".";
function forEachObject(obj, func) {
  Object.keys(obj).forEach(function(key) {
    func(key, obj[key]);
var dat = JSON.parse("{}");
  });
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

client.on("guildCreate", guild => {
  var embed = new Discord.RichEmbed()
    .setColor(0x5500ff)
    .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`);
  guild.owner.sendEmbed(embed);
});

client.on("message", msg => {
  if (msg.content === ".support") {
    msg.reply(
      "**https://discord.gg/wXf7sJt**``join our support server and get help| ادخل سيرفر دعم الفني و احصل على المساعدة``  "
    );
  }
});

 


client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = message.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = oldMessage.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = oldRole.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
    if (oldRole.permissions !== newRole.permissions) {
      let roleUpdate = new Discord.RichEmbed()
        .setTitle("**[UPDATE ROLE PERMISSIONS]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:first_place: Successfully \`\`CHANGED\`\` **${oldRole.name}** Permissions!\n\n**Old Permissions:** \`\`${oldRole.permissions}\`\`\n**New Permissions:** \`\`${newRole.permissions}\`\`\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdate);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;

  var logChannel = oldChannel.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor(exec)
        .setThumbnail(myUser.avatarURL)
        .addField('- Banned User:',`**${myUser.username}**`,true)
        .addField('- Banned By:',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
            .setTimestamp();
          log.send(embed).catch(e => {
            console.log(e);
          });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});

client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});
client.on("guildMemberUpdate", (oldMember, newMember) => {
  var logChannel = oldMember.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "``اسمه الاصلي``";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "``اسمه الاصلي``";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();

      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();

      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});
client.on("guildMemberAdd", member => {
  var logChannel = member.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  let newMember = new Discord.RichEmbed()
    .setTitle("**[NEW MEMBER ADDED]**")
    .setThumbnail(member.user.avatarURL)
    .setColor("GREEN")
    .setDescription(
      `**\n**:arrow_lower_right: Joined **${
        member.user.username
      }** To the server!\n\n**User:** <@${member.user.id}> (ID: ${
        member.user.id
      })\n**Days In Discord:** ${Days(member.user.createdAt)}`
    )
    .setTimestamp()
    .setFooter(member.user.tag, member.user.avatarURL);

  logChannel.send(newMember);
});
function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}
client.on("guildMemberRemove", member => {
  var logChannel = member.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  let leaveMember = new Discord.RichEmbed()
    .setTitle("**[LEAVE MEMBER]**")
    .setThumbnail(member.user.avatarURL)
    .setColor("GREEN")
    .setDescription(
      `**\n**:arrow_upper_left: Leave **${member.user.username}** From the server.\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})`
    )
    .setTimestamp()
    .setFooter(member.user.tag, member.user.avatarURL);

  logChannel.send(leaveMember);
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = voiceOld.guild.channels.find(c => c.name === log);
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }

    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }

    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAFEN]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }

    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAFEN]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceOld.voiceChannel
  ) {
    let voiceJoin = new Discord.RichEmbed()
      .setTitle("**[JOIN VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceJoin);
  }

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceNew.voiceChannel
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[LEAVE VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});

client.on("message", async msg => {
  let args = msg.content.split(" "); //
  const mention =
    msg.mentions.users.first() || client.users.get(args[1]) || msg.author;
  if (msg.content === prefix + "id") {
    const embed = new Discord.RichEmbed();
    embed
      .addField(
        "🔱| Account Name :",
        `${msg.author.username}#${msg.author.discriminator}`,
        true
      )
      .addField("🆔| الاي دي :", `${msg.author.id}`, true)
      .setColor("RANDOM")
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setThumbnail(`${msg.author.avatarURL}`)
      .setTimestamp()
      .setURL(`${msg.author.avatarURL}`)
      .addField(
        "📛| الحالة :",
        `${msg.author.presence.status.toUpperCase()}`,
        true
      )
      .addField(
        "🎲| بلاينق :",
        `${
          msg.author.presence.game === null
            ? "No Game"
            : msg.author.presence.game.name
        }`,
        true
      )
      .addField(
        "🏅| الرتب : ",
        `${msg.member.roles.filter(r => r.name).size}`,
        true
      )
      .addField("💳| كريدتس", `$${credits[mention.id].credits}`, true)
    msg.channel.send({ embed: embed });
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "sug")) {
    if (!message.channel.guild) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    client.channels
      .get("636995803042414606")
      .send(
        "\n" +
          "**" +
          " ● Suggested By : " +
          "**" +
          "\n" +
          "**" +
          "» " +
          message.author.tag +
          "**" +
          "\n" +
          "**" +
          " ● Suggest : " +
          "**" +
          "\n" +
          "**" +
          args +
          "**"
      );

    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(" Suggested Sent")
      .setThumbnail(message.author.avatarURL)
      .setFooter(botname);
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.content.startsWith(prefix + "talk")) {
    var attentions = {};
    attentions[message.guild.id] = {};
    message.channel.send(message.author + ", **Wait , PuP System**").then(m => {
      m.edit(message.author + ", **أرسل أيدي الروم**");
      m.channel
        .awaitMessages(m1 => m1.author == message.author, {
          maxMatches: 1,
          time: 600000
        })
        .then(m1 => {
          m1 = m1.first();
          attentions[message.guild.id]["id"] = m1.content;
          m1.delete();
          m1 = message.guild.channels.get(
            `${attentions[message.guild.id]["id"]}`
          );
          if (!m1)
            return message.reply(
              `**الأيدي هذا غير صحيح \`${
                attentions[message.guild.id]["id"]
              }\`**`
            );

          m.edit(message.author + "**أرسل الرساله المراد توجيهها للروم**");
          m.channel
            .awaitMessages(m2 => m2.author == message.author, {
              maxMatches: 1,
              time: 600000
            })
            .then(m2 => {
              m2 = m2.first();
              attentions[message.guild.id]["msg"] = m2.content;
              m2.delete();
              m.delete();
              message.channel
                .send(
                  `**هل تريد إرسال في روم <#${
                    attentions[message.guild.id]["id"]
                  }>
${attentions[message.guild.id]["msg"]}**`
                )
                .then(msge => {
                  msge.react("✅").then(r => {
                    msge.react("❌");
                    const oneFilterBB = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const threeFilterBB = (reaction, user) =>
                      reaction.emoji.name === "❌" &&
                      user.id === message.author.id;
                    const oneBY = msge.createReactionCollector(oneFilterBB, {
                      maxMatches: 1,
                      time: 400000
                    });
                    const threeBY = msge.createReactionCollector(
                      threeFilterBB,
                      { maxMatches: 1, time: 400000 }
                    );
                    oneBY
                      .on("collect", r => {
                        msge.delete();
                        message.guild.channels
                          .get(`${attentions[message.guild.id]["id"]}`)
                          .send(`${attentions[message.guild.id]["msg"]}`);
                      })
                      .catch(RebeL => {
                        console.log("`Error`: " + RebeL);
                      });
                    threeBY.on("collect", r => {
                      msge.delete();
                    });
                  });
                });
            });
        });
    });
  }
});



client.on("message", zaid => {
  if (zaid.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField(
        "✽ **Bot Ping** : ",
        `» ${Date.now() - zaid.createdTimestamp}` + " ms",
        true
      )
      .addField("**Servers** :  ", `» ${client.guilds.size}`, true)
      .addField("**Channels** : ", `» ${client.channels.size} `, true)
      .addField("**Users** : ", `» ${client.users.size} `, true)
      .addField("**Bot Name** :  ", `» ${client.user.tag} `, true)
      .addField("**Bot Dev** :  ", `» <@388702736968843264>`, true) // تعديل مهم عدل هذا الرقم لايدي حسابك
      .setImage(
        ""
      )
      .setFooter(zaid.author.username, zaid.author.avatarURL);
    zaid.channel.send(bot);
  }
});
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "clear")) {
    if (!message.channel.guild)
      return message.channel
        .send("**This Command is Just For Servers**")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "**You Do not have permission** `MANAGE_MESSAGES`"
      );
    let args = message.content
      .split(" ")
      .join(" ")
      .slice(2 + prefix.length);
    let request = `Requested By ${message.author.username}`;
    message.channel
      .send(`**Are You sure you want to clear the chat?**`)
      .then(msg => {
        msg
          .react("✅")
          .then(() => msg.react("❌"))
          .then(() => msg.react(":negative_squared_cross_mark:"));

        let reaction1Filter = (reaction, user) =>
          reaction.emoji.name === "✅" && user.id === message.author.id;
        let reaction2Filter = (reaction, user) =>
          reaction.emoji.name === "❌" && user.id === message.author.id;

        let reaction1 = msg.createReactionCollector(reaction1Filter, {
          time: 12000
        });
        let reaction2 = msg.createReactionCollector(reaction2Filter, {
          time: 12000
        });
        reaction1.on("collect", r => {
          message.channel.send(`Chat will delete`).then(m => m.delete(5000));
          var msg;
          msg = parseInt();

          message.channel
            .fetchMessages({ limit: msg })
            .then(messages => message.channel.bulkDelete(messages))
            .catch(console.error);
          message.channel
            .sendMessage("", {
              embed: {
                title: "`` Chat Deleted ``",
                color: 0x06df00,
                footer: {}
              }
            })
            .then(msg => {
              msg.delete(3000);
            });
        });
        reaction2.on("collect", r => {
          message.channel
            .send(`**Chat deletion cancelled**`)
            .then(m => m.delete(5000));
          msg.delete();
        });
      });
  }
});


client.on('message', msg => {
	var prefix = ".";
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clr") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***```ضع عدد الرسائل التي تريد مسحها 👌```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bans")) {
    message.guild
      .fetchBans()
      .then(bans =>
        message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `)
      )
      .catch(console.error);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "banlist")) {
    if (!message.guild) return;
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `BAN_MEMBERS`"
      );
    message.guild.fetchBans().then(bans => {
      let b = bans.size;
      let bb = bans.map(a => `${a}`).join(" - ");
      message.channel.send(`** ${b} | ${bb}**`);
    });
  }
});

client.on("message", async message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "invites")) {
    var nul = 0;
    var guild = message.guild;
    await guild.fetchInvites().then(invites => {
      invites.forEach(invite => {
        if (invite.inviter === message.author) {
          nul += invite.uses;
        }
      });
    });
    if (nul > 0) {
      console.log(
        `\n${message.author.tag} has ${nul} invites in ${guild.name}\n`
      );
      var embed = new Discord.RichEmbed()
        .setColor("#000000")
        .addField(`${message.author.username}`, `لقد قمت بدعوة **${nul}** شخص`);
      message.channel.send({ embed: embed });
      return;
    } else {
      var embed = new Discord.RichEmbed()
        .setColor("#000000")
        .addField(
          `${message.author.username}`,
          `لم تقم بدعوة أي شخص لهذة السيرفر`
        );

      message.channel.send({ embed: embed });
      return;
    }
  }
});



client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel`
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name}`)
            .setColor("RANDOM")
            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "allbots")) {
    if (message.author.bot) return;
    let i = 1;
    const botssize = message.guild.members
      .filter(m => m.user.bot)
      .map(m => `${i++} - <@${m.id}>`);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(
        `**Found ${
          message.guild.members.filter(m => m.user.bot).size
        } bots in this Server**
${botssize.join("\n")}`
      )
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "apply")) {
    if (!message.channel.guild) return message.reply(" ");

    let submite = message.guild.channels.find(`name`, "التقديمات");

    if (!submite)
      return message.channel.send("❌لم اجد الروم الخاص بالتقديمات");

    let filter = m => m.author.id === message.author.id;

    let thisMessage;

    let thisFalse;

    message.channel.send("📝 **| your name please. | من فضلك اكتب اسمك الأن ... ✏ **").then(msg => {
      message.channel
        .awaitMessages(filter, {
          max: 1,

          time: 90000,

          errors: ["time"]
        })

        .then(collected => {
          collected.first().delete();

          thisMessage = collected.first().content;

          let boi;

          msg.edit("📜 **| what do you konw about dev | خبرتك في البرمجه... ✏ **").then(msg => {
            message.channel
              .awaitMessages(filter, {
                max: 1,

                time: 90000,

                errors: ["time"]
              })

              .then(collected => {
                collected.first().delete();

                boi = collected.first().content;

                let boi2;

                msg
                  .edit(
                    "🤵 **| مدة تفاعلك .  how much hrs you will be active in server... ✏ **"
                  )
                  .then(msg => {
                    message.channel
                      .awaitMessages(filter, {
                        max: 1,

                        time: 90000,

                        errors: ["time"]
                      })

                      .then(collected => {
                        collected.first().delete();

                        boi2 = collected.first().content;

                        msg.edit(
                          "🛡 **| [ هل انت متأكد من تقديمك؟ | are you sure do you want request | [no] or [yes]**"
                        );

                        message.channel
                          .awaitMessages(
                            response =>
                              response.content === "yes" || ("no" && filter),
                            {
                              max: 1,

                              time: 90000,

                              errors: ["time"]
                            }
                          )

                          .then(collected => {
                            if (collected.first().content === "no") {
                              msg.delete();

                              message.delete();

                              thisFalse = false;
                            }

                            if (collected.first().content === "yes") {
                              if (thisFalse === false) return;

                              msg.edit(
                                "🕊 **| Done ✅, تم بنجاح نشر تقديم في روم التقديمات**"
                              );

                              collected.first().delete();

                              submite.send(`@everyone | @here
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
**[ ${message.guild.name}:arrow_down: ] Submit⬇**
 
[**اسم المقدم**]:
${thisMessage}
 
[**خبرته في برمجة**]:
${boi}
 
[**مدة التفاعل**]:
${boi2}
 
[**تم التقديم بواسطة**]:
${message.author}
 
[**ايدي المقدم**]:
${message.author.id}`);
                            }
                          });
                      });
                  });
              });
          });
        });
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "ranks")) {
    const Rank = message.guild.roles.map(e => e.toString()).join(" ");

    const RankList = new Discord.RichEmbed()
      .setTitle("➠ Roles.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("RANDOM")
      .setDescription(Rank)
      .setFooter(message.guild.name);
    message.channel.send(RankList);
  }
});




client.on("message", async message => {
  if (message.content.startsWith(prefix + "serverstats")) {
    if (!message.guild.member(message.author).hasPermissions("MANAGE_CHANNELS"))
      return message.reply("❌ **لا تمتلك صلاحيه**");
    if (
      !message.guild
        .member(client.user)
        .hasPermissions(["MANAGE_CHANNELS", "MANAGE_ROLES_OR_PERMISSIONS"])
    )
      return message.reply("❌ **لا امتلك صلاحيه**");
    message.channel.send("✅| **تم عمل الروم بنجاح**");
    message.guild
      .createChannel(`Members : [ ${message.guild.members.size} ]`, "voice")
      .then(c => {
        console.log(`Done make room in: \n ${message.guild.name}`);
        c.overwritePermissions(message.guild.id, {
          CONNECT: false,
          SPEAK: false
        });
        setInterval(() => {
          c.setName(`Members : [ ${message.guild.members.size} ]`);
        }, 1000);
      });
  }
});




client.on("message", msg => {
  let args = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (msg.content.split(" ")[0].toLowerCase() === "+  cr") {
    if (!args)
      return msg.channel.send("`الرجاء كتابة عدد اللوان المرجى صنعها`");
    if (!msg.member.hasPermission("MANAGE_ROLES")) return;
    msg.channel.send(`** Done Colors Was Successful Created ${args}**`);
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < `${parseInt(args) + 1}`; x++) {
      msg.guild.createRole({ name: x, color: "RANDOM" });
    }
  }
});

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == "+color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**There's No Color With This Number ** :x: `)
      .setColor(`ff0000`);

    if (!isNaN(args) && args.length > 0)
      if (!message.guild.roles.find("name", `${args}`))
        return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args}`);
    if (!a) return;
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args}`));
  }
});

const reportconfig = JSON.parse(fs.readFileSync("./reportconfig.json", "UTF8"));
var reportcooldown = new Set();

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
 
 
    if(!reportconfig[message.guild.id]) reportconfig[message.guild.id] = {//by ixRawan_
        channel: "none",//by ixRawan_
        toggled: "on",//by ixRawan_
    }//by ixRawan_
    fs.writeFileSync('./reportconfig.json', JSON.stringify(reportconfig, null, 4), function (err){//by ixRawan_
        if(err) throw err;//by ixRawan_
    });//by ixRawan_
 
 
 
    var messages = message.content.split(" ").slice(1);//by ixRawan_
 
    let args = messages.slice(1); //by ixRawan_
 
    if(message.content.startsWith(prefix+'report')){//by ixRawan_
        let msg = message;
 
        if(reportconfig[message.guild.id].toggled == "off") return message.reply('**Sorry but report command is disabled on this server.**')
 
        if(reportcooldown.has(message.author)) return message.reply('**You can report again after 3min**')
 
//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_//by ixRawan_
 
        var report_channel1 = reportconfig[message.guild.id].channel;
 
 
        if(reportconfig[message.guild.id].channel == "none") {
            message.guild.members.forEach(m => {
                if(m.hasPermission("ADMINISTRATOR") || m.hasPermission("MANAGE_GUILD")) {
                    if(m.bot) return undefined;
                    try{
                        m.send(`**${message.author.username}#${message.author.discriminator} (ID: ${message.author.id}) tried to report someone but i cant find report channel please go on the server and type **\`${prefix}setreportchannel <channel name>\``)
                    }catch(e){
                        return undefined;
                    }
                }else{
                    return undefined;
                }
            })
        }
 
        var reports_channel = message.guild.channels.find('name', report_channel1)
 
        if(!reports_channel) return message.reply('**I cant find report channel with name** `'+report_channel1+'`')
       
        var mention = message.mentions.users.first();
       
        if(!mention) return message.reply('**Please, mention a member.**')
 
        if(mention.bot) return message.reply('**You cant report bots.**')
 
        if(mention.id == message.author.id) return message.reply('**You cant report yourself**');
       
        if(message.guild.member(mention).hasPermission("MANAGE_GUILD")) return message.reply('**You cant report this user.**')
       
        if(mention.id == message.guild.owner.id) return message.reply('**You cant report the owner.**')
 
 
        var reason = args.join(" ");
 
        if(!reason) return message.reply('**Please, specify a reason.**')
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`NEW REPORT`)
        .setThumbnail(message.author.avatarURL)
        .addField('**Reporter Name: **', `<@${message.author.id}> ID [ ${message.author.id} ]`, true)
        .addField('**ReportedUser Name: **', `${mention} ID [ ${mention.id} ]`, true)
        .addField('**Time** ', `[ ${moment(message.createdAt).format('D/MM/YYYY h:mm a')} ]`, true)
        .addField('**reason: **', `[ ${reason} ]`, true)
        .addField('**Channel: **', `${message.channel}`, true)
        reports_channel.send(embed)
        reportcooldown.add(message.author);
        message.channel.send('**Thank You, for reporting.**')
        setTimeout(async function (){
            reportcooldown.delete(message.author);
        }, 180000) //180000 = 3min and 64000 = 1min
    }else{
        if(message.content.startsWith(prefix+'setreportchannel')){
        if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send('**You dont have `MANAGE SERVER` Permission.**').then(m => {m.delete(5000)})
    var argss = message.content.split(" ").slice(1).join(" ")
    if(!argss) return message.reply('**write name of the channel**').then(m => {m.delete(4000)})
    var toggledt = reportconfig[message.guild.id].toggled;
    var channel1 = message.guild.channels.find('name', argss)
    if(!channel1) return message.channel.send('**couldnt find channel with name **`'+argss+'`').then(m => {m.delete(4000)})
        reportconfig[message.guild.id] = {
            channel: `${argss}`,
            toggled: toggledt,
        }//by ixRawan_
        fs.writeFile("./reportconfig.json", JSON.stringify(reportconfig, null, 4), function (err) {//by ixRawan_
            if(err) throw err;//by ixRawan_
            message.channel.send('**Done Chnaged report channel to **'+reportconfig[message.guild.id].channel)//by ixRawan_
        });
        }else{//by ixRawan_
            if(message.content.startsWith(prefix+'togglereports on')){//by ixRawan_
                                    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send('**You dont have `MANAGE SERVER` Permission.**').then(m => {m.delete(5000)})
                var oldchannel = reportconfig[message.guild.id].channel;//by ixRawan_
                reportconfig[message.guild.id] = {//by ixRawan_
                    channel: oldchannel,//by ixRawan_
                    toggled: "on",//by ixRawan_
                }//by ixRawan_
   
                fs.writeFile("./reportconfig.json", JSON.stringify(reportconfig, null, 4), function (err) {//by ixRawan_
                    if(err) throw err;//by ixRawan_
                });//by ixRawan_
                message.channel.send("**Done Toggled reports to `on`**")//by ixRawan_
            }else{//by ixRawan_
                if(message.content.startsWith(prefix+'togglereports off')){//by ixRawan_
                    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send('**You dont have `MANAGE SERVER` Permission.**').then(m => {m.delete(5000)})
                    var oldchannel = reportconfig[message.guild.id].channel;//by ixRawan_
                    reportconfig[message.guild.id] = {//by ixRawan_
                        channel: oldchannel,//by ixRawan_
                        toggled: "off",//by ixRawan_
                    }//by ixRawan_
       
                    fs.writeFile("./reportconfig.json", JSON.stringify(reportconfig, null, 4), function (err) {//by ixRawan_
                        if(err) throw err;//by ixRawan_
                    });//by ixRawan_
                    message.channel.send("**Done Toggled reports to `off`**")//by ixRawan_
                }else{//by ixRawan_
                    if(message.content.startsWith(prefix+'settingsreport')){//by ixRawan_
                        var embed2 = new Discord.RichEmbed()//by ixRawan_
                        .setDescription(`${prefix}setreportchannel <channel name> : لأختيار روم الابلاغات ملاحظة اكتب اسم الروم فقط بدون المنشن\n${prefix}togglereports off/on لتفعيل الابلاغات او الغاء التفعيل\n${prefix}statsreport > لمعرفة معلومات عن الرومات و ازا مفعل الابلاغات او لا\n${prefix}report <MentionMember> <reason> > للابلاغ عن عضو`)
                        message.channel.send(embed2)//by ixRawan_
                    }else{//by ixRawan_
                        if(message.content.startsWith(prefix+"statsreport")){//by ixRawan_
                            var toggledstats = reportconfig[message.guild.id].toggled;//by ixRawan_
                            var channelstats = reportconfig[message.guild.id].channel;//by ixRawan_
                            var embed3 = new Discord.RichEmbed()//by ixRawan_
                            .setDescription(`Channel: ${channelstats}\nToggled: ${toggledstats}`)//by ixRawan_
                            message.channel.send(embed3)//by ixRawan_
                        }//by ixRawan_
                    }//by ixRawan_
                }//by ixRawan_
            }//by ixRawan_
        }//by ixRawan_
    }//by ixRawan_
});//by ixRawan_

client.on("message", message => {
  var cats = [
    "http://www.shuuf.com/shof/uploads/2015/09/09/jpg/shof_b9d73150f90a594.jpg",
    "https://haltaalam.info/wp-content/uploads/2015/05/0.208.png",
    "https://haltaalam.info/wp-content/uploads/2015/05/266.png",
    "https://haltaalam.info/wp-content/uploads/2015/05/250.png",
    "https://haltaalam.info/wp-content/uploads/2017/02/0.2517.png",
    "https://pbs.twimg.com/media/CP0mi02UAAA3U2z.png",
    "http://www.shuuf.com/shof/uploads/2015/08/31/jpg/shof_3b74fa7295ec445.jpg",
    "http://www.shuuf.com/shof/uploads/2015/08/22/jpg/shof_fa3be6ab68fb415.jpg",
    "https://pbs.twimg.com/media/CSWPvmRUcAAeZbt.png",
    "https://pbs.twimg.com/media/B18VworIcAIMGsE.png"
  ];
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "هل تعلم")) {
    var cat = new Discord.RichEmbed().setImage(
      cats[Math.floor(Math.random() * cats.length)]
    );
    message.channel.sendEmbed(cat);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.isMentioned(client.user)) {
    message.reply("**My Prefix Is** : `.`");
  }
});

client.on("message", message => {
  let roleembed = new Discord.RichEmbed()
    .setDescription(
      `
    أمثله على الأوامر :
    -role @mention rolename : لأعطاء رتبة لعضو معين
    -role all rolename : لأعطاء رتبة للجميع
    -role humans rolename : لأعطاء رتبة للاشخاص فقط
    -role bots rolename : لأعطاء رتبة لجميع البوتات`
    )
    .setFooter(
      "Requested by " + message.author.username,
      message.author.avatarURL
    );
  var args = message.content.split(" ").slice(1);
  var msg = message.content.toLowerCase();
  if (!message.guild) return;
  if (!msg.startsWith(prefix + "role")) return;
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(" **__ليس لديك صلاحيات__**");
  if (msg.toLowerCase().startsWith(prefix + "roleembed")) {
    if (!args[0]) return message.channel.sendEmbed(roleembed);
    if (!args[1]) return message.channel.sendEmbed(roleembed);
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطاءها الى الشخص**");
    if (message.mentions.members.first()) {
      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء الى **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الى الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] تم اعطاء الى البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] تم اعطاء الى البشريين رتبة**"
      );
    }
  } else {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد اعطائها الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    if (message.mentions.members.first()) {
      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البشريين رتبة**"
      );
    }
  }
});

client.on('message', message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + 'new')) {
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission`)
  let log = message.guild.channels.find("name", log);
  let args = message.content.split(' ').slice(1).join(' ');
  let support = message.guild.roles.find("name","Support Team");
  let ticketsStation = message.guild.channels.find("name", "TICKETS");
  let reason = message.content.split(" ").slice(1).join(" ");
  if(!reason) reason = 'NONE';
  const embed = new Discord.RichEmbed()
  .setColor("#36393e")
  .addField(`**Error :interrobang:**`, `This server doesn't have a \`Support Team\` role made so the ticket won't be opened.`)
  .setTimestamp();
  if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send({ embed: embed });
  if(message.guild.channels.exists("name", `ticket-${message.author.username}`)) return message.channel.send(`You already have a ticket open :no_entry:`);
  if(!ticketsStation) return message.channel.send(`**Error! **:interrobang:\n please create \`category\` Called \`TICKETS\``)
  message.guild.createChannel(`ticket-` + message.author.username, "text").then(c => {
  c.setParent(ticketsStation);
  const done = new Discord.RichEmbed()
  .setColor(`GREEN`)
  .setTitle(`Ticket Created`)
  .setDescription(`Ticket : #${c.name}
  by :<@${message.author.id}>
  Reason : ${reason}`)
  .setTimestamp()
  .setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033107635208193/563111847692337174.png`)
  .setFooter(message.author.tag)
  if(log) log.send(done)
  let role = message.guild.roles.find("name", "Support Team");
  let role2 = message.guild.roles.find("name", "@everyone");
  c.overwritePermissions(role, {
  SEND_MESSAGES: true,
  READ_MESSAGES: true
  });
  c.overwritePermissions(role2, {
  SEND_MESSAGES: false,
  READ_MESSAGES: false
  });
                c.overwritePermissions(message.author, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });

                /////////////
  const eembed = new Discord.RichEmbed()
  .setColor("#00ffd4")
  //.setThumbnail(message.author.avatarURL)
  .addField(`Your ticket has been created :white_check_mark:`, `<#${c.id}>`)
  //////////////////
  message.channel.send({ embed: eembed });
  const embed = new Discord.RichEmbed()
  .setColor(0xCF40FA)
  .setThumbnail(message.author.avatarURL)
  .addField(`**Welcome**`, `<@${message.author.id}>`)
  .addField(`Our **__Support Team__** will be here soon to help.`, `** **`)
  .addField(`Reason :`, `${reason}`)
  .setTimestamp();
  c.send({ embed: embed }).then
  c.send(`<@${message.author.id}>`).then(b=>{
    b.delete();
  })
  }) .catch();
    }
    if(message.content.startsWith(prefix + 'closeTK')) {
       
      if(message.author.bot) return;
        if(!message.channel.name.startsWith("ticket-")) return message.channel.send(`this command only for the tickets`)
  let close = new Discord.RichEmbed()
  .addField(`type \`${prefix}closeTK\` again to confirm`, `** **`)
  .setColor("#36393e");
  message.channel.sendEmbed(close) .then(m => {
  const filter = msg => msg.content.startsWith(prefix + 'end');
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return
  message.channel.awaitMessages(response => response.content === prefix + 'closeTK', {
  max: 1,
  time: 20000,
  errors: ['time']
  })
  .then((collect) => {
  message.channel.delete();
  let Reason = message.content.split(" ").slice(1).join(" ");
  if(!Reason) Reason = 'NONE';
let closee = new Discord.RichEmbed()
.setColor(`BLUE`)
.setAuthor(`Ticket Closed`)
.setDescription(`Ticket : #${message.channel.name}
By : <@${message.author.id}>
Reason : ${Reason}`)
.setTimestamp()
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033109178712074/563111850162520077.png`)
.setFooter(message.author.tag)
let log = message.guild.channels.find("name", log);
if(log) log.send(closee)
  }) .catch(() => {
  m.delete()
  .then(message.channel.send('Ticket close timed out, the ticket was not closed')) .then((c) => {
  c.delete(4000);
  }) 
  })
  })     
    } if(message.content.startsWith(prefix + `multiclose`)) {
      if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission`)
      if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You don\'t have Permission **MANAGE_CHANNELS** to close all tickets');
      message.guild.channels.filter(c => c.name.toLowerCase().startsWith("ticket-")).forEach(channel => { channel.delete(); })
const ttt = new Discord.RichEmbed()
.setColor("GREEN")
.addField(`**Done all Tickets has been closed :white_check_mark:**`,`** **`)
message.channel.send(ttt)
let log = message.guild.channels.find("name", log);
const rr = new Discord.RichEmbed()
.setColor("GREEN")
.addField(`**all Tickets channels has been closed :white_check_mark:**`, `**by <@${message.author.id}>**`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588151961279397898/582096914376425501.png`)
.setTimestamp();
if(log) return log.send(rr)
//
} if(message.content.startsWith(prefix + `add`)) {
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission to do this`)
  if(!message.channel.name.startsWith("ticket-")) return message.channel.send(`this command only for the tickets`);
let member = message.mentions.members.first();
if(!member) return message.channel.send(`**Please mention the user :x:**`);
if(message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) return message.channel.send(`this member already in this ticket :rolling_eyes:`);
message.channel.overwritePermissions(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true });
message.channel.send(`**Done :white_check_mark:\nSuccessfully added <@${member.user.id}> to the ticket**`)
let tgt = new Discord.RichEmbed()
.setColor(`GREEN`)
.setAuthor(`Added member to a ticket`)
.setDescription(`Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033109539160066/563111851165220885.png`)
.setTimestamp();
let log = message.guild.channels.find("name", log);
if(log) return log.send(tgt);
} if(message.content.startsWith(prefix + `remove`)) {
  if(!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(`this command only for the tickets`);
  }
  let member = message.mentions.members.first();
  if(!member || member.id === client.user.id) {
      return message.channel.send(`**Please mention the user :x:**`);
  }
  if(!message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) {
      return message.channel.send(`:x: **${member.user.tag}** is not in this ticket to remove them`);
  }
  message.channel.overwritePermissions(member.id, { SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
  message.channel.send(`**Done :white_check_mark:\nSuccessfully removed \`${member.user.tag}\` from the ticket**`)
  let gtg = new Discord.RichEmbed()
.setColor(`BLUE`)
.setAuthor(`removed member from a ticket`)
.setDescription(`Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033111212949555/563111852352077886.png`)
.setTimestamp();
let log = message.guild.channels.find("name", log);
if(log) return log.send(gtg);
  }

  });

let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./server.json", "UTF8"));
client.on("message", message => {
    if (!message.channel.guild) return;
    let user = anti[message.guild.id + message.author.id]
    let num = message.content.split(" ").slice(2).join(" ");
    if (!anti[message.guild.id + message.author.id]) anti[message.guild.id + message.author.id] = {
        actions: 0
    }
    if (!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
    if (message.content.startsWith(prefix + "settings limits")) {
 
 
        if (message.author.id !== message.guild.owner.user.id) return message.channel.send(`**لا تستطيع استخدام هذا الامر**`);
        if (message.content.startsWith(prefix + "settings limitsban")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].banLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].banLimit} **`)
        }
        if (message.content.startsWith(prefix + "settings limitskick")) { 
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].kickLimits = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].kickLimits}**`)
        }
        if (message.content.startsWith(prefix + "settings limitsroleD")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].roleDelLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].roleDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "settings limitsroleC")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].roleCrLimits = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].roleCrLimits}**`)
        }
        if (message.content.startsWith(prefix + "settings limitschannelD")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].chaDelLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].chaDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "settings limitstime")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].time = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].time}**`)
        }
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    } 
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }
 
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
 
client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }
 
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
 
client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بأنشاء الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }
 
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
 
client.on("guildBanAdd", async (guild, user) => {
    const entry1 = await guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            guild.members.get(entry.id).ban().catch(e => guild.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }
 
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
 
client.on("guildKickAdd", async (guild, user) => {
    const entry1 = await guild.fetchAuditLogs({
        type: 'MEMBER_KICK'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            guild.members.get(entry.id).ban().catch(e => guild.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }
 
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
 
client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if (entry1.action === "MEMBER_KICK") {
        const entry2 = await member.guild.fetchAuditLogs({
            type: "MEMBER_KICK"
        }).then(audit => audit.entries.first())
        const entry = entry2.executor;
        if (!config[member.guild.id]) config[guild.id] = {
            banLimit: 3,
            chaDelLimit: 3,
            roleDelLimit: 3,
            kickLimits: 3,
            roleCrLimits: 3
        }
        if (!anti[member.guild.id + entry.id]) {
            anti[member.guild.id + entry.id] = {
                actions: 1
            }
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
        } else {
            anti[member.guild.id + entry.id].actions = Math.floor(anti[member.guild.id + entry.id].actions + 1)
            console.log("TETS");
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
            if (anti[member.guild.id + entry.id].actions >= config[member.guild.id].kickLimits) {
                member.members.get(entry.id).ban().catch(e => member.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
                anti[member.guild.id + entry.id].actions = "0"
                fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                    if (e) throw e;
                });
                fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                    if (e) throw e;
                });
            }
        }
 
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }
 
})
var Enmap = require("enmap");
client.antibots = new Enmap({ name: "chat" });
var antibots = client.antibots;
var julian = client;
julian.on("message", codes => {
  if (codes.content.startsWith(prefix + "antibots on")) {
    if (
      codes.author.bot ||
      !codes.channel.guild ||
      codes.author.id != codes.guild.ownerID
    )
      return;
    antibots.set(`${codes.guild.id}`, {
      onoff: "On"
    });

    codes.channel.send("AntiBots Join Is On");
  }
  if (codes.content.startsWith(prefix + "antibots off")) {
    if (
      codes.author.bot ||
      !codes.channel.guild ||
      codes.author.id != codes.guild.ownerID
    )
      return;
    antibots.set(`${codes.guild.id}`, {
      onoff: "Off"
    });
    codes.channel.send("AntiBots Join Is Off");
  }
});

julian.on("guildMemberAdd", member => {
  if (!antibots.get(`${member.guild.id}`)) {
    antibots.set(`${member.guild.id}`, {
      onoff: "Off"
    });
  }
  if (antibots.get(`${member.guild.id}`).onoff == "Off") return;
  if (member.user.bot) return member.kick();
});

client.on('message',message=>{
if(message.content == prefix+'discrim'){const tags = [];
client.users.filter(m => m.discriminator === `${message.author.discriminator}`).forEach(m => {
if(m.id == message.author.id)return; tags.push(`${m.tag}`);});
message.channel.send(`\`\`\`json\n${tags.join("\n")}\n\`\`\``)}})


client.on("message", message => {
  if (message.content.startsWith("+hack")) {
    if (!message.author.id === "") return;
    if (message.author.bot) return;
    message.delete();
    let args = message.content.split(" ").slice(1);

    let virusname = args.join(" ");
    if (virusname < 1) {
      return message.channel.send("**```اكتب اسم الشخص الي تبي يتهكر```**");
    }
    message.channel
      .send({
        embed: new Discord.RichEmbed()
          .setTitle("Loading " + virusname + "...")
          .setColor(0xff0000)
      })
      .then(function(m) {
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓ ] 1%")
              .setColor(0xff0000)
          });
        }, 1000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓ ] 2%")
              .setColor(0xff0000)
          });
        }, 2000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓▓ ] 3%")
              .setColor(0xff0000)
          });
        }, 3000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓▓▓ ] 4%")
              .setColor(0xff0000)
          });
        }, 4000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" + virusname + "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 20%"
              )
              .setColor(0xff0000)
          });
        }, 5000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 30%"
              )
              .setColor(0xff0000)
          });
        }, 6000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 40%"
              )
              .setColor(0xff0000)
          });
        }, 7000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 50%"
              )
              .setColor(0xff0000)
          });
        }, 8000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 70%"
              )
              .setColor(0xff0000)
          });
        }, 9000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 85%"
              )
              .setColor(0xff0000)
          });
        }, 10000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%"
              )
              .setColor(0xff0000)
          });
        }, 11000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%"
              )
              .setColor(0xff0000)
          });
        }, 12000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%"
              )
              .setColor(0xff0000)
          });
        }, 13000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%"
              )
              .setColor(0xff0000)
          });
        }, 14000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%"
              )
              .setColor(0xff0000)
          });
        }, 15000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 99%"
              )
              .setColor(0xff0000)
          });
        }, 16000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%"
              )
              .setColor(0xff0000)
          });
        }, 17000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]:" +
                  virusname +
                  "done it's going good 100.9%"
              )
              .setColor(0xff0000)
          });
        }, 18000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يتم تهكير ")
              .setColor(0xff0000)
          });
        }, 19000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: تحديث بسيط" + virusname + ".key")
              .setColor(0xff0000)
          });
        }, 22000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يرجى انتضار ثواني 5...")
              .setColor(0xff0000)
          });
        }, 25000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يرجى انتضار ثواني 4...")
              .setColor(0xff0000)
          });
        }, 26000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يرجى انتضار ثواني 3...")
              .setColor(0xff0000)
          });
        }, 27000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يرجى انتضار ثواني 2...")
              .setColor(0xff0000)
          });
        }, 28000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: يرجى انتضار ثواني 1...")
              .setColor(0xff0000)
          });
        }, 29000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%"
              )
              .setColor(0xff0000)
          });
        }, 30000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added"
              )
              .setColor(0xff0000)
          });
        }, 31000);
        setTimeout(function() {
          m.delete();
        }, 32000);
        setTimeout(function() {
          message.channel.send("** ! تمت عمليه التهكير بنجاح **");
        }, 33000);
      });
  }
});

client.on("message", message => {
  let args = message.content.split(" ");

  if (args[0] === `{prefix}avatar`) {
    let mentions = message.mentions.members.first();
    if (!mentions) {
      let sicon = message.author.avatarURL;
      let embed = new Discord.RichEmbed()
        .setImage(message.author.avatarURL)
        .setColor("#f7abab")
        .setDescription(
          `**${message.author.username}#${message.author.discriminator}**'s avatar :`
        );
      message.channel.send({ embed });
    } else {
      let sicon = mentions.user.avatarURL;
      let embed = new Discord.RichEmbed()
        .setColor("#f7abab")
        .setDescription(
          `**${mentions.user.username}#${mentions.user.discriminator}**'s avatar :`
        )
        .setImage(sicon);
      message.channel.send({ embed });
    }
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "contact")) {
    if (!message.channel.guild) return;

    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");

    client.users
      .get("388702736968843264", "471795779867115540")
      .send(
        "\n" +
          "**" +
          "● السيرفر :" +
          "**" +
          "\n" +
          "**" +
          "» " +
          message.guild.name +
          "**" +
          "\n" +
          "**" +
          " ● المرسل : " +
          "**" +
          "\n" +
          "**" +
          "» " +
          message.author.tag +
          "**" +
          "\n" +
          "**" +
          " ● الرسالة : " +
          "**" +
          "\n" +
          "**" +
          args +
          "**"
      );

    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription("📬 تم ارسال الرسالة الى صاحب البوت بنجاح")
      .setThumbnail(message.author.avatarURL)
      .setFooter("Earth Bot | System");

    message.channel.send(embed);
  }
});


client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] == `${prefix}nickall`) {
    if (
      !message.member.hasPermission("MANAGE_NICKNAMES") ||
      !message.guild.me.hasPermission("MANAGE_NICKNAMES")
    )
      return;
    if (!args[1])
      return message.reply("Type the nickname ( [name] = member username ).");
    let members = message.guild.members.filter(m => m.manageable);
    message.channel.send(`Changing nickname for ${members.size} members.`);
    members.forEach((m, i) => {
      setTimeout(() => {
        m.setNickname(
          args
            .slice(1)
            .join(" ")
            .replace("[name]", m.user.username)
        ).catch(e => {
          message.channel.send(
            `Could not change nickname for **${m.user.tag}**.`
          );
        });
      }, 2000 * i);
    });
  }
});

client.on("message", pixelbot => {
  // itzZa1D - Codes Team.
  if (pixelbot.content.startsWith(prefix + "user")) {
    // itzZa1D - Codes Team.
    if (pixelbot.author.bot) return;
    if (!pixelbot.guild)
      return pixelbot.reply("**:x: - This Command is only done on Servers**");
    pixelbot.guild.fetchInvites().then(invites => {
      // itzZa1D - Codes Team.
      let personalInvites = invites.filter(
        i => i.inviter.id === pixelbot.author.id
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var roles = pixelbot.member.roles
        .map(roles => `**__${roles.name}__ |**`)
        .join(` `);
      let pixeluser = new Discord.RichEmbed() // itzZa1D - Codes Team.
        .setColor("#00000")
        .setTitle(" :beginner: :heartpulse:   | User Info") // itzZa1D - Codes Team.
        .setAuthor(pixelbot.author.username, pixelbot.author.avatarURL)
        .addField("**✽ Name :**   ", pixelbot.author.username, true)
        .addField("**✽ Tag :**   ", pixelbot.author.discriminator, true)
        .addField("**✽ ID :** ", pixelbot.author.id, true) // itzZa1D - Codes Team.
        .addField(
          "**✽ Joined At :**   ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField(
          "**✽ Created At :**    ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField("**✽ Total invites :**    ", inviteCount, true)
        .setTimestamp(); // itzZa1D - Codes Team.

      pixelbot.channel.sendEmbed(pixeluser).then(c => {}); // itzZa1D - Codes Team.
    });
  }
}); // itzZa1D - Codes Team.


client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (!message.channel.guild) return;
    var msg = `${Date.now() - message.createdTimestamp}`;
    var api = `${Math.round(client.ping)}`;
    if (message.author.bot) return;
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("#5016f3")
      .addField("**Time Taken:**", msg + " ms :signal_strength: ")
      .addField("**WebSocket:**", api + " ms :signal_strength: ")
      .setTimestamp();
    message.channel.send({ embed: embed });
  }
});


 



client.on("message", message => {
  if (message.content === prefix + "closechannel") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" **__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**__تم تقفيل الشات__ ✅ **");
          var logChannel = message.guild.channels.find(c => c.name === log);
if (!logChannel) return;

let messageDelete = new Discord.RichEmbed()
  .setTitle("**[WELCOME CHANNEL CHANGED]**")
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
   .setDescription(
    `**\n**🚪 Successfully Muted A Channel \n\n**Muted Channel:**  ${message.channel} \n **MESSAGE:** In ${message.channel} \n **Channel:** ${message.channel.name} \n (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
  )
  .setTimestamp()
  .setFooter(message.guild.name, message.guild.iconURL);

logChannel.send(messageDelete);
      });
  }

  if (message.content === prefix + "unclosechannel") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**__تم فتح الشات__ ✅**");
              var logChannel = message.guild.channels.find(c => c.name === log);
if (!logChannel) return;

let messageDelete = new Discord.RichEmbed()
  .setTitle("**[WELCOME CHANNEL CHANGED]**")
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
   .setDescription(
    `**\n**🚪 Successfully UnMuted A Channel \n\n**UnMuted Channel:**  ${message.author.channel} \n **MESSAGE:** In ${message.channel} \n **Channel:** ${message.channel.name} \n (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
  )
  .setTimestamp()
  .setFooter(message.guild.name, message.guild.iconURL);

logChannel.send(messageDelete);
      });
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.content === prefix + "avatar server") {
    const embed = new Discord.RichEmbed()

      .setTitle(`ServerAvatar${message.guild.name} **  `)
      .setAuthor(message.author.username, message.guild.iconrURL)
      .setColor(0x164fe3)
      .setImage(message.guild.iconURL)
      .setURL(message.guild.iconrURL)
      .setTimestamp();

    message.channel.send({ embed });
  }
});



client.on("message", message => {
  if (message.content === prefix + "rooms") {
    var channels = message.guild.channels
      .map(channels => `${channels.name}, `)
      .join(" ");
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("rooms:", `**[${channels}]**`);
    message.channel.sendEmbed(embed);
  }
});





client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  let alias = message.content.split(" ")[0].substring(prefix.length);
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(" ");
  let devs = ["388702736968843264"]; // هنا تحط ايدي الديف الي مسموح لهم بـ زياده الكريدتس
  let mention = message.mentions.users.first() || message.author; // تعريف المنشن
  if (alias === "setstream") {
    // تعريف الكوماند
    let args = message.content.split(" "); //أستخدام الأرجس مره ثانيه
    if (!devs.includes(message.author.id)) return; // اذا واحد من الديف كتب الرسالة ولكن كانت فاضيه
    client.user.setGame(argresult, "http://twitch.tv/y04zgamer");
    message.channel.sendMessage(
      `**${argresult}** :تم تغيير الحالة الى ستريمنج`
    );
  }

  if (alias === "setplaying") {
    // تعريف الكوماند
    let args = message.content.split(" "); //أستخدام الأرجس مره ثانيه
    if (!devs.includes(message.author.id)) return; // اذا واحد من الديف كتب الرسالة ولكن كانت فاضيه
    client.user.setGame(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغيير الحالة`);
  }

  if (alias === "setname") {
    // تعريف الكوماند
    let args = message.content.split(" "); //أستخدام الأرجس مره ثانيه
    if (!devs.includes(message.author.id)) return; // اذا واحد من الديف كتب الرسالة ولكن كانت فاضيه
    client.user.setUsername(argresult).then;
    message.channel.sendMessage(`**${argresult}** : تم تغير الأسم`);
    return message.reply("**لا تستطيع تغير الأسم الا بعد ساعتين**");
  }
  if (alias === "setimage") {
    // تعريف الكوماند
    let args = message.content.split(" "); //أستخدام الأرجس مره ثانيه
    if (!devs.includes(message.author.id)) return; // اذا واحد من الديف كتب الرسالة ولكن كانت فاضيه
    client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
  }
  if (alias === "setwatching") {
    // تعريف الكوماند
    let args = message.content.split(" "); //أستخدام الأرجس مره ثانيه
    if (!devs.includes(message.author.id)) return; // اذا واحد من الديف كتب الرسالة ولكن كانت فاضيه
    client.user.setActivity(argresult, { type: "watching" });
    message.channel.sendMessage(`**${argresult}** : تم تغيير الووتشينق الى`);
  }
});

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("Rock", "🇷", true)
      .addField("Paper", "🇵", true)
      .addField("Scissors", "🇸", true);
    message.channel.send(RpsEmbed).then(msg => {
      msg.react(" 🇷");
      msg.react("🇸");
      msg
        .react("🇵")
        .then(() => msg.react("🇷"))
        .then(() => msg.react("🇸"))
        .then(() => msg.react("🇵"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🇷" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "🇸" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🇵" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 12000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 12000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 12000
      });
      reaction1.on("collect", r => {
        message.channel.send(result);
      });
      reaction2.on("collect", r => {
        message.channel.send(result);
      });
      reaction3.on("collect", r => {
        message.channel.send(result);
      });
    });
  }
});


client.on("message", msg => {
  if (msg.content.startsWith(prefix + "send")) {
    let args = msg.content.split(" ").slice(1);
    if (!args[0]) return msg.reply(`**منشن الشخص اولا**`);
    if (!args[1]) return msg.reply(`**ما هي الرساله المطلوب ارسالها**`);
    let alpha = msg.mentions.members.first();
    if (!alpha) return msg.reply(`**يجب تحديد الشخص**`);
    let alphaEmbed = new Discord.RichEmbed()
      .setTitle(`**رسالة جديده لك من شخص ما**`)
      .setDescription(args.join(" "));

    client.users.get(`${alpha.id}`).send(alphaEmbed);
    msg.reply(`**تم ارسال الرساله**`);
  }
});

client.on("message", message => {
  let user =
    message.mentions.users.first() ||
    client.users.get(message.content.split(" ")[1]);
  if (message.content.startsWith(prefix + "unban")) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("❌|**`ADMINISTRATOR`لا توجد لديك رتبة`**");
    if (!user)
      return message.channel.send(
        `Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`
      );
    message.guild.unban(user);
    message.guild.owner.send(
      `لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`
    );
    var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURl)
      .setColor("RANDOM")
      .setTitle("**●Unban** !")
      .addField("**●User Unban :** ", `${user}`, true)
      .addField("**●By :**", ` <@${message.author.id}> `, true)
      .setAuthor(message.guild.name);
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bs")) {
    let msg = client.guilds
      .map(guild => `**${guild.name}** عدد الاعضاء: ${guild.memberCount}`)
      .join("\n");
    let embed = new Discord.RichEmbed()
      .setTitle(`${client.guilds.size} سيرفرات `)
      .setDescription(`${msg}`)
      .setColor("#ebf442");
    message.channel.send(embed);
  }
});

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "invite")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
    .setColor("RANDOM")
     .addField("الرجاء اختيار نوع جهازك", "Computer | Phone", false)
      .addField("Phone | تلفون", "📱", true)
      .addField("Computer | كمبيوتر", "🖥️", true)
    .setFooter("Earth Bot")
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("📱");
      msg.react("🖥️")
        .then(() => msg.react("📱"))
        .then(() => msg.react("🖥️"))
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "📱" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "👑" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🖥️" && user.id === message.author.id;
      let reaction4Filter = (reaction, user) =>
        reaction.emoji.name === "🖥️" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 20000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 19000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 18000
      });
      let reaction4 = msg.createReactionCollector(reaction4Filter, {
        time: 18000
      });
      reaction1.on("collect", r => {
  const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setThumbnail(client.user.avatarURL)
.setAuthor(message.author.username, message.author.avatarURL)
.setTitle("Click Here To Invite The Bot | اضغط هنا لدعوة البوت")
.setURL(
  "https://discordapp.com/api/oauth2/authorize?client_id=654597880610291722&permissions=8&scope=bot"
);
        message.author.send("https://discordapp.com/api/oauth2/authorize?client_id=654597880610291722&permissions=8&scope=bot");
        message.reply("تم ارسالك لينك دعوة بوت في خاص");
      });
      reaction2.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/553862087382925313/556036868492230667/logo-admin-png-4.png"
          )
          .setColor("#000000").setDescription(`
      :key:***__اوامر ادارية |" https://discord.gg/hQhd6AT" __***:crown: 
**

للأستفسار ادخلو سيرفر دعم الفني
" https://discord.gg/hQhd6AT"

『${prefix}rolebc ====> رسالة لرتبة معينة
『${prefix}setbot ====> لعمل روم صوتي بعدد البوتات في السيرفر
『${prefix}bans ====> الاعضاء المبندين من سيرفرك
『${prefix}serverstats ====> لعمل روم صوتي بعدد اعضاء السيرفر
『${prefix}leave ====> لطرد البوت من سيرفرك
『${prefix}setMedia ====> لتحديد روم الصور
『${prefix}ranks ====> يوريك رتب السيرفر
『${prefix}voiceonline ====> لعمل روم صوتي اونلاين
『${prefix}schannel ====> اضهار الشات المخفية
『${prefix}hchannel ====> اخفاء الشات
『${prefix}talk ====> للتكلم بصفة البوت
『${prefix}count ====> عدد اعضاء السيرفر
『${prefix}setlog ====> لصنع روم اللوج
『${prefix}server ====> يعرض لك معلومات عن السيرفر
『${prefix}movall ====> لسحب الجميع الى رومك
『${prefix}sug ====> suggestions لصنع اقتراح لازم روم 
『${prefix}bs ====> لمعرفة سيرفرات البوت
『${prefix}rooms ====> لرؤية رومات السيرفر
『${prefix}dc ====> مسح كل الرومات
『${prefix}dr ====>  فوق كل الرانكات
『${prefix}allbots ====> يوريك كل البوتات في سيرفرك
『${prefix}move ====> لسحب عضو الى روم صوتية
『${prefix}giveaway ====> لصنع جيفواي
『${prefix}role @mention rolename ====> لأعطاء رتبة لعضو معين
『${prefix}role all rolename ====> لأعطاء رتبة للجميع
『${prefix}role humans rolename ====> لأعطاء رتبة للاشخاص فقط
『${prefix}role bots rolename ====> لأعطاء رتبة لجميع البوتات
『${prefix}members ====> حالات اعضاء السيرفر
『${prefix}send ====> ارسال رسالة لشخص المنشن
『${prefix}clr <numbr> ====> مسح الشات بعدد
『${prefix}clear ====> مسح الشات
『${prefix}mute @user <reason> ====> اعطاء العضو ميوت لازم رتبة <Muted>
『${prefix}unmute @user ====> لفك الميوت عن الشخص 
『${prefix}kick @user <reason> ====>   "هذا الامر الان مطفي موقتا"طرد الشخص من السرفر
『${prefix}ban @user <reason> ====>  "هذا الامر مطفي موقتا"حضر الشخص من السيرفر
『${prefix}unban @user ====> لفك حضر الشخص من السيرفر
『${prefix}mutechannel ====> تقفيل الشات
『${prefix}unmutechannel ====> فتح الشات
**
`);
        message.author.sendEmbed(embed);
        message.reply("تم ارسالك بلخاص");
      });
      reaction3.on("collect", r => {
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setThumbnail(client.user.avatarURL)
.setAuthor(message.author.username, message.author.avatarURL)
.setTitle("Click Here To Invite The Bot")
.setURL(
  "https://discordapp.com/api/oauth2/authorize?client_id=654597880610291722&permissions=8&scope=bot"
);
        message.author.sendEmbed(embed);
        message.reply("تم ارسالك بلخاص");
      });
      reaction3.on("collect", r => {
        const embed = new Discord.RichEmbed().setColor("#000000")
          .setDescription(`
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
`);
      });
    });
  }
});





   client.on('message', message => {
    if(message.content.startsWith(prefix + 'moveall')) {
     if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send('**:x: You Dont Have Perms `MOVE_MEMBERS`**');
       if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**:x: I Dont Have Perms `MOVE_MEMBERS`**");
    if (message.member.voiceChannel == null) return message.channel.send(`**You Have To Be In Room Voice**`)
     var author = message.member.voiceChannelID;
     var m = message.guild.members.filter(m=>m.voiceChannel)
     message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
     m.setVoiceChannel(author)
     })
     message.channel.send(`**:white_check_mark: Success Moved All To Your Channel**`)


     }
       });



client.on('message', async message => {
  let args = message.content.split(" ");
  if(message.content.startsWith(prefix + "mute")) {
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {  // Alpha Codes Ghost
      msg.delete(3500);
      message.delete(3500);
    });
   if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    let mention = message.mentions.members.first();
    if(!mention) return  message.channel.send('').then(msg => {  // Alpha Codes Ghost
      msg.delete(3500);
      message.delete(3500);
    });
 
    if(mention.id === message.author.id) return message.channel.send('**:x:You Cannot give mute to your self**').then(msg => { // Alpha Codes Ghost
   
      message.delete(3500);
    });
   
    if(mention.hasPermission('ADMINISTRATOR')) return message.channel.send(`**:x: لا يمكن آعطاء ميوت لادارة السيرفر**`);
 
    if(message.guild.member(mention).roles.find('name', 'Muted')) return message.channel.send(`**:information_source: ${mention.user.username} Already Muted**`);// Alpha Codes Ghost
 
   
    if(mention.position >= message.guild.member(message.author).positon) return message.channel.send('You Donot Have Permission **Muted_Members** ').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
   
    if(mention.positon >= message.guild.member(client.user).positon) return message.channel.send('I Donot Have Permission **Muted_Members**').then(msg => { // Alpha Codes Ghost
      msg.delete(3500);
      message.delete(3500);
    });
   
    let duration = args[2];
    if(!duration) message.channel.send(`**:hash: You Can Use ${prefix}mute @user Time Reason**`).then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    if(isNaN(duration))  message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    let reason = message.content.split(" ").slice(3).join(" "); // Alpha Codes Ghost
    if(!reason) reason = " [ **لم يذكر لماذا** ] ";
 var logChannel = message.guild.channels.find(c => c.name === log);
    let thisEmbed = new Discord.RichEmbed()
    .setAuthor(mention.user.username, mention.user.avatarURL)
    .setTitle('**Muted!**')
    .addField('**__السيرفر__**',[ message.guild.name ])
    .addField('**__ ميوت بواسطة__**', [ message.author ])
    .addField('**__آلسبب__**',reason)
    .addField('**__وقت الميوت__**',duration) // Alpha Codes Ghost
    if (!logChannel) return;
    logChannel.send(thisEmbed);
    
 
    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!role) try {
      message.guild.createRole({
        name: "Muted",
        permissions: 0
      }).then(r => {
        message.guild.channels.forEach(c => {
          c.overwritePermissions(r , {
            SEND_MESSAGES: false,  // Alpha Codes Ghost
            READ_MESSAGES_HISTORY: false,
            ADD_REACTIONS: false
          });
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed); // Alpha Codes Ghost
      message.channel.send(`**:white_check_mark: ${mention.user.username}  Muted! :zipper_mouth:  **  `);
      mention.setMute(true);
    });
    setTimeout(() => {
      if(duration === 0) return;
      mention.setMute(false);
      mention.removeRole(role)
    },duration * 60000);
  } // Alpha Codes Ghost
});
client.on('message', async message => {
    let mention = message.mentions.members.first();
let command = message.content.split(" ")[0];
     command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);  
if(command === `unmute`) {2
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**You Donot HavePermission Mute_Members**").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I donot Have Permission Mute_Members**").then(msg => msg.delete(6000))
 
  let kinggamer = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
     if(!kinggamer) return message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    }); // Alpha Codes Ghost
 
  let role = message.guild.roles.find (r => r.name === "Muted");
 var logChannel = message.guild.channels.find(c => c.name === log);
  if(!role || !kinggamer.roles.has(role.id)) return message.channel.sendMessage(`**:information_source:${mention.user.username} لقد تم فك الميوت عنه مسبقا**`)
 
  await kinggamer.removeRole(role)
  message.channel.sendMessage(`**:white_check_mark: ${mention.user.username}  Unmuted! **`);
                              if (!logChannel) return;
    logChannel.send("**unmuted ${mention.user.username} by ${message.author.tag}**");
 
  return;
 
  }
 
});
 



var devs = ["388702736968843264","471795779867115540"]
var developers = ["388702736968843264","471795779867115540"]
client.on('message',async message => {
if(message.author.bot) return undefined;
if(message.content.startsWith(prfs + "roleinfo")) {
let role1 = message.content.split(" ").slice(1).join(" ");
let role = message.guild.roles.find('name',role1) || message.guild.roles.get(role1);
if(!role1) return message.channel.send(`**:x: | Error , Please Type Command True Ex : \`${prfs}roleinfo [RoleName]\`**`);
if(!role) return message.channel.send('**:x: | Error , I Can\'t Find This Role**');
let roleinfo = new Discord.RichEmbed()
.setAuthor(message.author.username,message.author.avatarURL)
.setColor("BLUE")
.addField('? Role Name',`» \`${role.name}\``,true)
.addField('? Role ID',`» \`${role.id}\``,true)
.addField('? Role Color',`» \`${role.hexColor}\``,true)
.addField('? Role CreateAt',`» \`${role.createdAt.toLocaleString()}\``,true)
.setThumbnail(message.guild.iconURL)
.setFooter(client.user.username,client.user.avatarURL)
.setTimestamp()
message.channel.send(roleinfo);
}
});



const credits = JSON.parse(fs.readFileSync('./credits.json'));
const creditsPath = './credits.json';
var time = require("./time.json");
client.on('message',async message => {
  var Canvas = require('canvas')
if(message.author.bot || message.channel.type === 'dm') return;
let args = message.content.split(' ');
let author = message.author.id;
if(!credits[author]) credits[author] = {
credits: 0
}
if(!credits[author]) credits[author] = {
blacklist: false
}
fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
if(credits[message.author.id].blacklist === true) return undefined;
if(args[0].toLowerCase() == `${prfs}credit` || args[0].toLowerCase() === `${prfs}credits`) {
const mention = message.mentions.users.first() || client.users.get(args[1]) || message.author;
const mentionn = message.mentions.users.first() || client.users.get(args[1]);
if(!args[2]) {
message.channel.send(`**:money_with_wings: | ${mention.username}, Have Credits \`$${credits[mention.id].credits}\`**`)
} else if(mentionn && args[2]) {
if(isNaN(args[2])) return message.channel.send(`**:x: | Error**`);
if(args[2] < 1) return message.channel.send(`**:x: | Error**`);
if(mention.bot) return message.channel.send(`**:x: | Error**`);      
if(mentionn.id === message.author.id) return message.channel.send(`**:x: | Error**`);
if(args[2] > credits[author].credits) return message.channel.send(`**:x: | Error , You Don't Have Enough Credit**`);
if(args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
if(args[2].includes(".")) return message.channel.send(`**:x: | Error**`);
let first = Math.floor(Math.random() * 9);
let second = Math.floor(Math.random() * 9);
let third = Math.floor(Math.random() * 9);
let fourth = Math.floor(Math.random() * 9);
let num = `${first}${second}${third}${fourth}`;
let canvas = Canvas.createCanvas(150 , 50)
let ctx = canvas.getContext('2d');
const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/653622087201849375/656070567073415178/PicsArt_12-16-12.49.43.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".gif" : message.author.displayAvatarURL;
jimp.read(url, (err, ava) => {
if(err) return console.log(err);
ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
if(err) return console.log(err);
ctx.font = "sans-serif";
ctx.fontSize = '180px';
ctx.fillStyle = "#ffffff";
message.channel.send(`**${message.author.username}, You Will Trans \`$${args[2]}\` To ${mentionn} 
If You Want To Complete Trans Type The Number Above in this image **`).then(essss => {
ctx.fillText(num, canvas.width / 2.4, canvas.height / 1.7);
message.channel.sendFile(canvas.toBuffer()).then(m => {
message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
if(collected.first().content === num) {
client.channels.get("653624195149725711").send(`**
المرسل : ${message.author.username} | (ID: \`${message.author.id}\`)
المستقبل : ${mentionn.username} | (ID: \`${mentionn.id}\`)
الكريدتس : \`$${args[2]}\`
**`);
message.channel.send(`**:moneybag: | ${message.author.username}, Done Trans \`$${args[2]}\` To ${mentionn}**`);
mention.send(`**:money_with_wings: | Transfer Receipt** \`\`\`You Have Received \`$${args[2]}\` From User ${message.author.username}; (ID (${message.author.id})\`\`\``);
m.delete();
credits[author].credits += Math.floor((-args[2]));
credits[mentionn.id].credits += Math.floor((+args[2]));
fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
} else {
m.delete();
essss.delete();
}
})
})
})
})
})
}else {
message.channel.send(`**:x: | Error , Please Command True Ex: \`${prfs}redit [MentionUser] [Balance]\`**`);
}
}
if(args[0].toLowerCase() === `${prfs}daily`) {
let cooldown = 8.64e+7
let Daily = time[message.author.id]
if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
let times = (cooldown - (Date.now() - Daily));
message.channel.send(`**:stopwatch: | ${message.author.username}, Please Wait \`(${pretty(times, {verbose:true})})\` To Take Your Daily Again.**`);
fs.writeFile("./time.json", JSON.stringify(time), function(e) {
if(e)throw e;
})
}else{
let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
credits[author].credits += ammount;
time[message.author.id] = Date.now();
message.channel.send(`**:money_with_wings:| ${message.author.username}, Done You Have Take Your Daily \`$${ammount}\`**`);
fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
if(e)throw e;
})
}
}
});
var guildT = '652931951245918222';
var channelT = '653624195149725711';
client.on("message", msg => {
if(msg.author.bot) return undefined
if(msg.content.startsWith(prfs + "rcredit")) {
if(!msg.guild.roles.exists("name", "› Mange RemoveCredit")) return undefined;
if(!guildT.includes(msg.guild.id)) return;
if(!channelT.includes(msg.channel.id)) return;
let user = client.users.get(msg.content.split(" ")[1])
let reason = msg.content.split(" ").slice(2).join(" ");
if(!reason || !user) return msg.channel.send(`**:x: | Error , Please Type Command True Ex : \`${prfs}rcredit [ID] [Reason]\`**`)
let channell = client.channels.get("653624195149725711")
channell.send(`**:white_check_mark: | Done I Have Remove \`${credits[user.id].credits}\` Credit From <@${user.id}>, Reason: \`${reason}\` By: <@${msg.author.id}>**`)
msg.channel.send("**:white_check_mark: | Done.**")
credits[user.id].credits = 0
fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
if(e)throw e;
})
}
})

client.on('message',async message => {
let Fire = message.content.split(" ")[0].substring(prfs.length);
let mention = message.mentions.users.first() || message.author
if(Fire === "cg") {
let args = message.content.split(" ");
if(!devs.includes(message.author.id)) return;
if(!args[1] || isNaN(args[1])) return message.reply("**Type Credit**")
if(!credits[mention.id]) return;
credits[mention.id].credits += (+args[1]);
fs.writeFileSync("./credits.json", JSON.stringify(credits));
console.log(credits[mention.id])
message.reply(`**Give : \`${args[1]}\`**`);
} else if(Fire === "cr") {
let args = message.content.split(" ");
if(!devs.includes(message.author.id)) return;
if(!args[1] || isNaN(args[1])) return message.reply("**Type Credit**")
if(!credits[mention.id]) return;
credits[mention.id].credits += (-args[1]);
fs.writeFileSync("./credits.json", JSON.stringify(credits));
console.log(credits[mention.id])
message.reply(`**Removed : \`${args[1]}\`**`);
}
});
let level = JSON.parse(fs.readFileSync("./level.json", "utf8"));
client.on("message", message => {
  if (message.author.bot) return undefined;
  if (!level[message.author.id])
    level[message.author.id] = {
      xp: 0,
      level: 0
    };
  let username = message.author;
  level[message.author.id].xp++;
  let userlevel = level[message.author.id];
  if (userlevel.xp > Math.floor(Math.random() * 250) + 50) {
    userlevel.level++;
    userlevel.xp = 0;
  }
  fs.writeFileSync("./level.json", JSON.stringify(level), function(s) {
    if (s) throw s;
  });
});


const log = JSON.parse(fs.readFileSync("./log.json", "utf8"));

client.on("message", message => {
  if (!message.channel.guild) return;

  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find("name", `${room}`);
  if (message.content.startsWith(prefix + "setlog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});

client.on('guildCreate', guild => {
let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`? \`${client.user.username}\` Join New Server.`)
.addField("? Server/ID:",`» \`${guild.name}\` | \`(ID: ${guild.id})\``)
.addField("? Server Owner:",`» ${guild.owner}`)
.addField("? Member Count:",`» \`${guild.memberCount}\``)
.addField("? Servers Counter:",`» \`${client.guilds.size}\``)
client.channels.get("653624217283330050").send(embed)
})
client.on('guildDelete', guild => {
let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`\`${client.user.username}\` Leave New Server.`)
.addField("? Server/ID:",`» \`${guild.name}\` | \`(ID: ${guild.id})\``)
.addField("? Server Owner:",`» ${guild.owner}`)
.addField("? Member Count:",`» \`${guild.memberCount}\``)
.addField("? Servers Counter:",`» \`${client.guilds.size}\``)
client.channels.get("653624275294486528").send(embed)
})

client.on('message',async message => {
if(message.author.bot) return undefined;
if(message.content.startsWith(prfs + "inforole")) {
let role1 = message.content.split(" ").slice(1).join(" ");
let role = message.guild.roles.find('name',role1) || message.guild.roles.get(role1);
if(!role1) return message.channel.send(`**:x: | Error , Please Type Command True Ex : \`${prfs}inforole [RoleName]\`**`);
if(!role) return message.channel.send('**:x: | Error , I Can\'t Find This Role**');
let roleinfo = new Discord.RichEmbed()
.setAuthor(message.author.username,message.author.avatarURL)
.setColor("BLUE")
.addField('? Role Name',`» \`${role.name}\``,true)
.addField('? Role ID',`» \`${role.id}\``,true)
.addField('? Role Color',`» \`${role.hexColor}\``,true)
.addField('? Role CreateAt',`» \`${role.createdAt.toLocaleString()}\``,true)
.setThumbnail(message.guild.iconURL)
.setFooter(client.user.username,client.user.avatarURL)
.setTimestamp()
message.channel.send(roleinfo);
}
});

const roblox = require("noblox.js")
client.on("message", msg => {
if(msg.author.bot) return undefined;
if(msg.content.startsWith(prfs + "roblox")) {
let args = msg.content.split(" ").slice(1).join(" ");
if(!args) return msg.channel.send(`**:x: | Error , Please Type Command True Ex: \`${prfs}roblox [UserName]\`**`)
roblox.getIdFromUsername(args).then(id => {
roblox.getPlayerInfo(parseInt(id)).then(player => {
let roblox = new Discord.RichEmbed()
.setAuthor(msg.author.username,msg.author.avatarURL)
.setColor("BLUE")
.setTitle(`**» Roblox: \`${player.username}\`**`)
.setURL(`https://www.roblox.com/users/${id}/profile`)
.addField("? Username",`» ${player.username}`)
.addField("? User ID",`» ${id}`)
.addField("? User Blurb",`» ${player.blurb || 'Nothing'}`)
.addField("? User Status",`» ${player.status || 'Nothing'}`)
.setFooter(client.user.username,client.user.avatarURL)
.setTimestamp()
msg.channel.sendEmbed(roblox)
})
}).catch(e => {
msg.channel.send("**:x: | Error , I Can\'t Find This User**" + ` \`${args}\``)
})
}
})



  
 
 




let ar = JSON.parse(fs.readFileSync(`./AutoRole.json`, `utf8`))
client.on('guildMemberAdd', member => {
if(!ar[member.guild.id]) ar[member.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(ar[member.guild.id].onoff === 'Off') return;
member.addRole(member.guild.roles.find(`name`, ar[member.guild.id].role)).catch(console.error)
})
client.on('message', message => {
if(!message.guild) return
if(!ar[message.guild.id]) ar[message.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(message.content.startsWith(prefix + `autorole`)) {
let perms = message.member.hasPermission(`MANAGE_ROLES`)
if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
let args = message.content.split(" ").slice(1)
if(!args.join(" ")) return message.reply(`${prefix}autorole toggle/set [ROLE NAME]`)
let state = args[0]
if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
if(state.trim().toLowerCase() == 'toggle') {
if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
}
if(state.trim().toLowerCase() == 'set') {
let newRole = message.content.split(" ").slice(2).join(" ")
if(!newRole) return message.reply(`${prefix}autorole setrole [ROLE NAME]`)
if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
ar[message.guild.id].role = newRole
message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
}
  }
if(message.content === prefix + 'info') {
let perms = message.member.hasPermission(`MANAGE_GUILD`)
if(!perms) return message.reply(`You don't have permissions.`)
var embed = new Discord.RichEmbed()
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
.setColor(`BLUE`)
message.channel.send({embed})
}
fs.writeFile("./AutoRole.json", JSON.stringify(ar), (err) => {
if (err) console.error(err)
});
})
const sWlc = {}
const premium = ['489342754887827487', '', '', '']
client.on('message', message => {
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcomer")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**${prefix}setwelcomer <channel name>**`)
    sWlc[message.guild.id].channel = newChannel
    var logChannel = message.guild.channels.find(c => c.name === log);
if (!logChannel) return;

let messageDelete = new Discord.RichEmbed()
  .setTitle("**[WELCOME CHANNEL CHANGED]**")
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
   .setDescription(
    `**\n**🚪 Successfully Set New Welcome Channel \n\n**New Welcome Channel:**  ${newChannel} \n **MESSAGE:** In ${message.channel} \n **Channel:** ${message.channel.name} \n (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
  )
  .setTimestamp()
  .setFooter(message.guild.name, message.guild.iconURL);

logChannel.send(messageDelete);
    const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setThumbnail(client.user.avatarURL)
.setAuthor(message.author.username, message.author.avatarURL)
.setTitle("لقد تم تغيير روم الترحيب 🚪")
.addField("🎁روم الترحيب الجديد🎁", newChannel, false)
.addField("Command Author", message.author.username, false)
.setFooter("Earth Bot")
message.channel.sendEmbed(embed);
  }
});


const count = require("./count.json")
const finished = require("./finished.json")

client.on('ready', () => {
    bot.setInterval(() => {
        let ga;
        Object.keys(finished).forEach((key) => {
            ga = key
        });
        if (finished[ga] !== undefined) {
            if (Date.now() > finished[ga].timefinish) {
                finished[ga + ' Finished'] = {
                    Joins: finished[ga].Joins,
                    Leaves: finished[ga].Leaves
                }
                finished[ga].Joins = 0
                finished[ga].Leaves = 0
                finished[ga].timefinish = Date.now() + 6.048e+8
                fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => { if (err) throw err; })
            }
        }
    }, 5000)
 
})
client.on('guildMemberAdd', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8 //7 days in milliseconds
        }
    } else {
        count[codes.guild.id].Joins += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8 //7 days in milliseconds
        }
    } else {
        finished[codes.guild.id].Joins += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})
client.on('guildMemberRemove', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8 //7 days in milliseconds
        }
    } else {
        count[codes.guild.id].Leaves += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8 //7 days in milliseconds
        }
    } else {
        finished[codes.guild.id].Leaves += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})
client.on('message', function (message) {
    const messageArray = message.content.split(' ')
    const command = messageArray[0].toLowerCase()
    const args = messageArray.slice(1)
    if (command == `${prefix}statics`) {
        var embed = new Discord.RichEmbed()
        let guild;
        embed.setThumbnail('https://images-ext-2.discordapp.net/external/Ipad3NgJiBDzH7P2O-B9ZZYODJz2dTSQgpvfcjvpboA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/284151161291014144/e69770d9de5ae7d6d4fd0258dfef2876.png')
        embed.setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
        if (count[message.guild.id] == undefined) {
            embed.setTitle('Sorry there\'s no info!')
            return message.channel.send(embed)
        }
        if (count[message.guild.id] !== undefined) {
            let tjlr = (count[message.guild.id].Joins / count[message.guild.id].Leaves).toFixed(2)
            if (tjlr == Infinity) tjlr = '0.00'
            embed.addField('Total Joins / Leaves Ratio', `\`${tjlr}\``)
            embed.addField('Total Joins / Leaves', `\`${count[message.guild.id].Joins}\` / \`-${count[message.guild.id].Leaves}\``)
        }
        if(finished[message.guild.id] == undefined) return message.reply("انت جبت العيد بحاجة ... او مسحت حاجة من الجسون")
        if (guild == message.guild.id) {
            let something = (finished[message.guild.id].Joins / finished[message.guild.id].Leaves).toFixed(2)
            if(isNaN(something)) something = 0.00
            embed.addField('This week\'s stats', `Joins: \`${finished[message.guild.id].Joins}\` Leaves: \`-${finished[message.guild.id].Leaves}\` Joins/Leaves Ratio : \`${something}\``)
        }
        finished[message.guild.id + ' Finished'] == undefined ? embed.addField('Last week\'s Stats', 'a week hasn\'t passed yet') : embed.addField('Last week\'s stats', `Joins: \`${finished[message.guild.id + ' Finished'].Joins}\` Leaves: \`-${finished[message.guild.id + ' Finished'].Leaves}\` Joins/Leaves Ratio:\` ${(finished[message.guild.id + ' Finished'].Joins / finished[message.guild.id + ' Finished'].Leaves).toFixed(2)}\``);
        message.channel.send(embed)
    }
})

let newsjson = JSON.parse(fs.readFileSync("./news.json", "utf8"))
client.on('message', message => {
    let news = message.content.split(" ").slice(1).join(" ")
    if(message.content.startsWith(prefix + 'setnews')) {
          if(!news) return message.channel.send(`❌ | Please Write The News For Example: ${prefix}setnews fix bugs`)
           newsjson[client.user.id] = {
            new: news,
           }
           message.channel.send(`✅ | Done The Bot News Has Been Updated !`)
        }
    if(message.content.startsWith( prefix + 'botnews')) {
        if(!newsjson[client.user.id]) newsjson[client.user.id] = {
            new: 'nothing'
        }
        let embed = new Discord.RichEmbed()
        .setTitle(`📰 | ${client.user.username} Latest News :`)
        .setDescription(`${newsjson[client.user.id].new}`)
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}`)
           message.channel.sendEmbed(embed)
        }
        fs.writeFile("./news.json", JSON.stringify(newsjson), (err) => {
        })
})


client.on('message', message => {
    if(message.content == prefix + "botinfo") {
    const mkcode = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`All Users Count`,`
    - Users & Bots: ${client.users.size}
    - Users: ${client.users.filter(m =>!m.bot).size}
    - Bots: ${client.users.filter(m=>m.bot).size}`, true)
    .addField(`All Users Status`,`
    - Online: ${client.users.filter(m=>m.presence.status == 'online').size}
    - Offline: ${client.users.filter(m=>m.presence.status == 'offline').size}
    - Dnd: ${client.users.filter(m=>m.presence.status == 'dnd').size}
    - Idle: ${client.users.filter(m=>m.presence.status == 'idle').size}`, true)
        message.channel.send(`- <@${client.user.id}> Users Informations\n- Requested by ${message.author}`,{embed: mkcode});
        }
});

client.on('message',  async  message  =>  {
  let  user  =  message.mentions.users.first();
  let  reason  =  message.content.split(' ').slice(2).join(' ');
if(message.content.startsWith(prefix  +  'warn'))  {
  message.delete();
  if(!message.member.hasPermission('MUTE_MEMBERS')) return      message.channel.send('**للأسف لا تمتلك صلاحيات' );
  if(!user)  return  message.channel.send("**  -  mention  a  member  **")
  if(!reason)  return  message.channel.send("**  -  Type  Reason  **")
  let  reportembed  =  new  Discord.RichEmbed()
  .setTitle(`**New  Warned User !**`)
.addField("**-  Warned  User:**",  `[${user}  with  ID  ${user.id}]`)
.addField('**-  Warned  By:**',`[${message.author.tag} with id ${message.author.id}]`)
.addField('**-  Reason:**',  `[${reason}]`,  true)
.addField("**-  Warned  in:**",`[${message.channel.name}]`)
.addField("**-  Time & Date:**",`[${message.createdAt}]`)
.setFooter("Earth Bot")
.setColor('#060c37')
let incidentchannel = message.guild.channels.find(`name`, "warns");
if(!incidentchannel) return message.channel.send("Can't find warns channel.");
incidentchannel.send(reportembed);
message.reply(`**:warning: ${user} has been warned !:warning:**`).then(msg  =>  msg.delete(3000));
user.send(`**:warning: You are has been warned in ${message.guild.name} reason: ${reason} :warning:**`)
}


})

 
client.on('message', message => {
  if(message.content.split(' ')[0] == `${prefix}ban`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have permission.');
      if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.channel.send('I don\'t have permission.');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send(`Usage: ${prefix}ban @mention reason`);
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send('You can\'t ban yourself!');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`You can't ban **${user.user.tag}** because his role highest than your role!`);
     if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`I can't ban **${user.user.tag}** because his role highest than my role!`);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD') || user.user.id == message.guild.owner.id) return message.channel.send(`You can't ban **${user.user.tag}** because he have Administration permissions!`);
     if(!message.guild.member(user.user).bannable) return message.channel.send(`I can't ban **${user.user.tag}**.`);
      message.guild.member(user).ban(reason, user);
      message.channel.send(`Done :+1:, I Banned ${user.user.username} from the server!\nReason: \`\`${reason}\`\``);
    }
});


client.on('message', message => {
  if(message.content.split(' ')[0] == `${prefix}kick`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You don\'t have permission.');
      if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.channel.send('I don\'t have permission.');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send(`Usage: ${prefix}kick @mention reason`);
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send('You can\'t kick yourself!');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`You can't kick **${user.user.tag}** because his role highest than your role!`);
     if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`I can't kick **${user.user.tag}** because his role highest than my role!`);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD') || user.user.id == message.guild.owner.id) return message.channel.send(`You can't kick **${user.user.tag}** because he have Administration permissions!`);
     if(!message.guild.member(user.user).kickable) return message.channel.send(`I can't kick **${user.user.tag}**.`);
      message.guild.member(user).kick(reason, user);
      message.channel.send(`Done :+1:, I Kicked ${user.user.username} from the server!\nReason: \`\`${reason}\`\``);
    }
});

client.on('message', message =>{
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban") {
  if(!message.member.hasPermission('BAN_MEMBERS')) return;
  let args = message.content.split(" ").slice(1).join(" ");
  if(args == 'all') {message.guild.fetchBans().then(zg => {
  zg.forEach(NoNo => {message.guild.unban(NoNo);})});
  return message.channel.send('**✅ Unbanned all members **')}
  if(!args) return message.channel.send('**Please Type the member ID / all**');
  message.guild.unban(args).then(m =>{message.channel.send(`**✅ Unbanned ${m.username}**`);
  }).catch(stry =>{message.channel.send(`**🙄 - I can't find \`${args}\` in the ban list**`)});
  }});


let role = "› Donator";
let vipKeys = JSON.parse(fs.readFileSync("./vipKeys.json", "utf8"));


client.on("message", msg=>{
let id = "388702736968843264"; // اسم رتبة الفيب
let Price = 10; // السعر
let Price2 = Math.floor(Price-(Price*(5/100)));
if(!Price || Price < 1) return;
let cmd = msg.content.split(' ')[0];
if(cmd === `${prefix}usekey`){
  let roleW = msg.guild.roles.find(r=>r.name == role);
  let args = msg.content.split(" ").slice(1)[0];
  if(!args) {  
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - **الرجاء ادخال كود الهدية** \`${prefix}used <Key>\``)
    msg.reply(embed).then( z => z.delete(3000));
    return
}
  let embed = new Discord.RichEmbed()
.setTitle(`**جاري التحقق من الكود**`)
.setColor("#42f4f4")
  msg.reply(embed).then( msgs =>{
  if(vipKeys[args]){
    let hda = msg.member.roles.find(r=>r.name == role)
    if(hda){
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **انت تمتلك هذه الرتبة مسبقًا**  \`${role}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    return
    }
    let embed = new Discord.RichEmbed()
    .setTitle(`:tada: - **مبروك تم اعطائك رتبة** \`${role}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    msg.member.addRole(roleW);
    delete vipKeys[args]
    save()
  }else{
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **الكود غير صيحيح أو انه مستعمل من قبل**`)
    .setColor("#42f4f4")
    msgs.edit(embed)
  }});
}
});
 
function genKey(msg,role){
  let args = msg.content.split(" ");
  const mention = msg.mentions.users.first() || client.users.get(args[1]) || msg.author;
  var randomkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gift = "";
  for (var y = 0; y < 16; y++) {   ///16
    gift +=  `${randomkeys.charAt(Math.floor(Math.random() * randomkeys.length))}`;
  }
  vipKeys[gift] = role;
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:ok_hand: - **تم ارسآل الكود على الخاص**`);
  msg.reply(embed);
  let embed2= new Discord.RichEmbed()
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .setThumbnail(msg.author.avatarURL)
  .addField("**Key Of Gift**", gift,true)
  .addField("Role",role,true)
  .addField("This Key Made by", msg.author, true)
    .addField("This Key useable at", "https://discord.gg/hQhd6AT", true)
  .addField("Room The Key maked on", msg.channel , true)
  .addField("This Key Maked For", mention , true)
  .setTimestamp()
  .setFooter(client.user.username,client.user.displayAvatarURL)  
  msg.author.send(embed2);
  save()
}
 
function save(){
  fs.writeFile("./vipKeys.json", JSON.stringify(vipKeys), (err) => {
    if (err) console.log(err)
  });
 
}



client.on('message', msg => {
let args = msg.content.split(" ");
  const mention = msg.mentions.users.first() || client.users.get(args[1]) || msg.author;
  if(!devs.includes(msg.author.id)) return;
  if(msg.content.split(' ')[0] == `${prefix}gen`){
    genKey(msg,role)
  }
});

const Captcha = JSON.parse(fs.readFileSync("./Captcha.json","utf8"));
client.on("message", msg => {
    if(!msg.guild) return;
    if(msg.author.bot) return;
    if(!Captcha[msg.guild.id]) Captcha[msg.guild.id] = {
        role: "Nothing",
        room: "Nothing",
        cmd: "Captcha"
    } 
    if(msg.content.startsWith(prefix + "verifyrole")){
                if(!msg.guild.member(msg.author).hasPermission('MANAGE_GUILD')) return msg.reply(`**Sorry But You Don\'t Have Permission \`MANAGE_GUILD\`**`).then(m => m.delete(5000));
        let args = msg.content.split(' ').slice(1).join(' ');
        if(!args) return msg.reply(`**عليك كتابت اسم الرتبة الخاصة بالتفعيل**`).then(m => m.delete(5000));
        if(!msg.guild.roles.find("name",args)) return msg.channel.send(`لا يوجد رتبة بأسم \`${args}\` `).then(m => m.delete(5000));
        Captcha[msg.guild.id].role = args
  msg.reply(`**تم تغير اسم الرتبة الخاصة بالتفعيل لـ \`${args}\`**`).then(m => m.delete(5000));
                    fs.writeFile("./Captcha.json", JSON.stringify(Captcha), function(a) {
        if (a) throw a;
    })
    }
    if(msg.content.startsWith(prefix + "verifyroom")){
if(!msg.guild.member(msg.author).hasPermission('MANAGE_GUILD')) return msg.channel.send(`**Sorry But You Don\'t Have Permission \`MANAGE_GUILD\`**`).then(m => m.delete(5000));
         let args2 = msg.content.split(' ').slice(1).join(' ');
        if(!args2) return msg.reply(`**عليك كتابت اسم الرتبة الخاصة بالتفعيل**`).then(m => m.delete(5000));
         if(!msg.guild.channels.find("name",args2)) return msg.channel.send(`**لا يوجد روم بأسم \`${args2}\`**`).then(m => m.delete(5000));
        Captcha[msg.guild.id].room = args2
  msg.reply(`**تم تغير اسم الروم الخاص بالتفعيل لـ \`${args2}\`**`).then(m => m.delete(5000));
            fs.writeFile("./Captcha.json", JSON.stringify(Captcha), function(a) {
        if (a) throw a;
    })
    }
      if(msg.content.startsWith(prefix + "verifycmd")){
if(!msg.guild.member(msg.author).hasPermission('MANAGE_GUILD')) return msg.channel.send(`**Sorry But You Don\'t Have Permission \`MANAGE_GUILD\`**`).then(m => m.delete(5000));
         let args3 = msg.content.split(' ').slice(1).join(' ');
        if(!args3) return msg.reply(`**عليك كتابت الامر الخاص بالتفعيل**`).then(m => m.delete(5000));

        Captcha[msg.guild.id].cmd = args3
  msg.reply(`**تم تغير امر الخاص بالتفعيل لـ \`${args3}\` **`).then(m => m.delete(5000));
            fs.writeFile("./Captcha.json", JSON.stringify(Captcha), function(a) {
        if (a) throw a;
    })
	  }
});

        client.on("message",async message => {
        if(!message.channel.guild) return;
        if(!Captcha[message.guild.id]) Captcha[message.guild.id] = {
        role: "Nothing",
        room: "Nothing",
        cmd: "Captcha"
        } 
        if(message.content.startsWith(prefix + Captcha[message.guild.id].cmd || "Captcha")){
        if(Captcha[message.guild.id].role === 'Nothing') return message.reply(`**لم يتم اختيار الرتبة الخاصة بالتفعيل عليك ان تكتب \`${prefix}setCaptcharole\`**`).then(m => m.delete(5000));
        if(Captcha[message.guild.id].room === 'Nothing') return message.reply(`**لم يتم اختيار الروم الخاص بالتفعيل عليك ان تكتب \`${prefix}setCaptcharoom\`**`).then(m => m.delete(5000));
        if (message.guild.member(message.author).roles.find(x => x.name === `${Captcha[message.guild.id].role}`)) return message.channel.send(`**${message.author}, انت تملك الرتبة بالفعل**`).then(m => m.delete(5000));
        if(!message.channel.guild) return message.channel.send(`**هذا الأمر فقط للسيرفرات**`).then(m => m.delete(5000));
        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.channel.send(`**Sorry But I Don\'t Have Permission \`MANAGE_GUILD\`**`).then(m => m.delete(5000));
        if(message.channel.name !== `${Captcha[message.guild.id].room}`) return message.reply(`**انت لست في الروم الصحيح برجاء التوجه الي روم \`${Captcha[message.guild.id].room}\`**`).then(m => m.delete(5000));
    	const canvas = Canvas.createCanvas(108 , 40);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  
        var one = Math.floor(Math.random() * 9) + 1;
        var two = Math.floor(Math.random() * 9) + 1;
        var three = Math.floor(Math.random() * 9) + 1;
        var four = Math.floor(Math.random() * 9) + 1;
        var number = `${one}${two}${three}${four}`;
        ctx.font = '20px Arial Bold';
        ctx.fontSize = '20px';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(number, canvas.width / 2.4, canvas.height / 1.7);
        const attachment = new Discord.Attachment(canvas.toBuffer());
        message.channel.send(attachment).then(m => {
        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000}).then(c => {
        if(c.first().content !== number) {
        m.delete();
        }else if(c.first().content === number) {
        m.delete();
        message.member.addRole(message.guild.roles.find("name", Captcha[message.guild.id].role));    
        message.channel.send(`**${message.author.username}, تم تفعيلك بنجاح**`).then(m => m.delete(1000));
        }
		})
	    });
        }
        });

var vote = 0
client.on('message', async(message)=>{
    const argsa = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = argsa.shift().toLowerCase();
  if (command == 'votemute') {
    if(message.author.bot) return;
    if(vote != 0) return message.channel.send('هناك عمليت تصويت')
    if (!message.member.roles.find('name',"mutevote")) return message.reply('ماعندك رتبت `mutevote`');

  if(!message.channel.guild) return message.reply(`هذا الامر للسيرفرات  :x:`);
    var args1 = message.content.split(" ").slice(1);
 
    let mention = message.mentions.members.first();
      var userM = message.guild.member(message.mentions.users.first());
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(argsa[0]));
      if(!tomute) return message.reply("انت لم تمنشن عضو").then(m => m.delete(10000));
      if(mention.id === message.author.id) return message.reply('انت لا تسطيع اسكات نفسك').then(m => m.delete(10000));
      if(mention.user.id === message.guild.owner.id) return message.reply(`لا استطيع اسكات صاحب السيرفر :x:`).then(msg => msg.delete(10000));
      if(message.guild.member(userM.user).hasPermission("ADMINISTRATOR")) return message.reply('هذا العضو يملك `ADMINISTRATOR`').then(m => m.delete(10000));
      let muterole = message.guild.roles.find(`name`, "Muted");
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      let bcSure = new Discord.RichEmbed()		
                        .setTitle(`تصويت لاسكات شخص`)
                        .setColor('RANDOM')
                         .setDescription(`اذا حصل على 2من ✅  سيسكت
للتصويت يجب ان يكون عندك رتبت vote
مهلت التصويت دقيقة`)
                        .addField("المصوت",`<@${message.author.id}>`,true)
                        .addField("المصوت عليه ",`<@${tomute.id}>`,true)



                        message.channel.send(bcSure).then( (msg) => {  msg.react('✅') ;
        message.delete();
								   
        let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && message.guild.members.get(user.id).roles.find('name',"vote") &&  user.id != tomute.id ;

        let rc = msg.createReactionCollector(yesEmoji);
				rc.on('collect', r => {
          vote ++;
if(vote ==2){
  let mutetime = args1[1];
  tomute.addRole(muterole.id);
  message.channel.send(`تم اسكات <@${tomute.id}>`);
  vote = 0
  msg.delete()
} 

        })
	 setTimeout(()=>{
	    msg.delete()
            message.channel.send(`انتهت مهلت التصويت`);
vote = 0
},60000)
      })
        
    }

    })

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "server")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
    .setColor("RANDOM")
     .addField("الرجاء اختيار ماذا تريد ان تعرف | Please Choose What You want to know", "حالة السيرفر | حالة الاعضاء", false)
      .addField("حالة الاعضاء | Members Status", "👥", true)// حالة الاعضاء | Members Status
      .addField("حالة السيرفر | Server Status", "🌍", true)// 🌍
    .setFooter("Earth Bot")
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("🌍");
      msg.react("👥")
        .then(() => msg.react("🌍"))
        .then(() => msg.react("👥"))
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🌍" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "👑" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "👥" && user.id === message.author.id;
      let reaction4Filter = (reaction, user) =>
        reaction.emoji.name === "👥" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 20000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 19000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 18000
      });
      let reaction4 = msg.createReactionCollector(reaction4Filter, {
        time: 18000
      });
      reaction1.on("collect", r => {
        message.delete();
       const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(":id:✽** Server ID:**", `» ${message.guild.id} `, true)
      .addField(
        ":calendar:✽** Created On**",
        `» ${message.guild.createdAt.toLocaleString()}`,
        true
      )
      .addField(":crown: ✽**Server Owner**", `**${message.guild.owner}**`, true)
      .addField(
        ":speech_balloon:✽** Channels **",
        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +
          " Text | Voice  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField(":earth_africa:✽** Region **", ` ${message.guild.region}`, true)
      .setImage(
        ""
      )

      .setColor("#000000");
    message.channel.send({ embed: embed });
        
      });
      reaction2.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/553862087382925313/556036868492230667/logo-admin-png-4.png"
          )
          .setColor("#000000").setDescription(`
      :key:***__اوامر ادارية |" https://discord.gg/hQhd6AT" __***:crown: 
**

للأستفسار ادخلو سيرفر دعم الفني
" https://discord.gg/hQhd6AT"

『${prefix}rolebc ====> رسالة لرتبة معينة
『${prefix}setbot ====> لعمل روم صوتي بعدد البوتات في السيرفر
『${prefix}bans ====> الاعضاء المبندين من سيرفرك
『${prefix}serverstats ====> لعمل روم صوتي بعدد اعضاء السيرفر
『${prefix}leave ====> لطرد البوت من سيرفرك
『${prefix}setMedia ====> لتحديد روم الصور
『${prefix}ranks ====> يوريك رتب السيرفر
『${prefix}voiceonline ====> لعمل روم صوتي اونلاين
『${prefix}schannel ====> اضهار الشات المخفية
『${prefix}hchannel ====> اخفاء الشات
『${prefix}talk ====> للتكلم بصفة البوت
『${prefix}count ====> عدد اعضاء السيرفر
『${prefix}setlog ====> لصنع روم اللوج
『${prefix}server ====> يعرض لك معلومات عن السيرفر
『${prefix}movall ====> لسحب الجميع الى رومك
『${prefix}sug ====> suggestions لصنع اقتراح لازم روم 
『${prefix}bs ====> لمعرفة سيرفرات البوت
『${prefix}rooms ====> لرؤية رومات السيرفر
『${prefix}dc ====> مسح كل الرومات
『${prefix}dr ====>  فوق كل الرانكات
『${prefix}allbots ====> يوريك كل البوتات في سيرفرك
『${prefix}move ====> لسحب عضو الى روم صوتية
『${prefix}giveaway ====> لصنع جيفواي
『${prefix}role @mention rolename ====> لأعطاء رتبة لعضو معين
『${prefix}role all rolename ====> لأعطاء رتبة للجميع
『${prefix}role humans rolename ====> لأعطاء رتبة للاشخاص فقط
『${prefix}role bots rolename ====> لأعطاء رتبة لجميع البوتات
『${prefix}members ====> حالات اعضاء السيرفر
『${prefix}send ====> ارسال رسالة لشخص المنشن
『${prefix}clr <numbr> ====> مسح الشات بعدد
『${prefix}clear ====> مسح الشات
『${prefix}mute @user <reason> ====> اعطاء العضو ميوت لازم رتبة <Muted>
『${prefix}unmute @user ====> لفك الميوت عن الشخص 
『${prefix}kick @user <reason> ====>   "هذا الامر الان مطفي موقتا"طرد الشخص من السرفر
『${prefix}ban @user <reason> ====>  "هذا الامر مطفي موقتا"حضر الشخص من السيرفر
『${prefix}unban @user ====> لفك حضر الشخص من السيرفر
『${prefix}mutechannel ====> تقفيل الشات
『${prefix}unmutechannel ====> فتح الشات
**
`);
        message.author.sendEmbed(embed);
        message.reply("تم ارسالك بلخاص");
      });
      reaction3.on("collect", r => {
        client.on('ready', () => {
    bot.setInterval(() => {
        let ga;
        Object.keys(finished).forEach((key) => {
            ga = key
        });
        if (finished[ga] !== undefined) {
            if (Date.now() > finished[ga].timefinish) {
                finished[ga + ' Finished'] = {
                    Joins: finished[ga].Joins,
                    Leaves: finished[ga].Leaves
                }
                finished[ga].Joins = 0
                finished[ga].Leaves = 0
                finished[ga].timefinish = Date.now() + 6.048e+8
                fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => { if (err) throw err; })
            }
        }
    }, 5000)
 
})
client.on('guildMemberAdd', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        count[codes.guild.id].Joins += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        finished[codes.guild.id].Joins += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})
client.on('guildMemberRemove', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        count[codes.guild.id].Leaves += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        finished[codes.guild.id].Leaves += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})

    const embed = new Discord.RichEmbed().setDescription(`**Members Status🔋
💖 Online   ${
      message.guild.members.filter(m => m.presence.status == "online").size
    }
🦻  D N D    ${
      message.guild.members.filter(m => m.presence.status == "dnd").size
    }
😴 idle      ${
      message.guild.members.filter(m => m.presence.status == "idle").size
    }   
📴 Offline   ${
      message.guild.members.filter(m => m.presence.status == "offline").size
    } 
  💗 Everyone  ${message.guild.memberCount}**`);
                   embed.addField('**👥 Total Joins - Leaves: **', `👥 **${count[message.guild.id].Joins}** | **${count[message.guild.id].Leaves}**`)
            embed.addField('**👥 Week stats: **', `👥 Joins: **${finished[message.guild.id].Joins}** | 👥 Leaves: **${finished[message.guild.id].Leaves}**`)
    message.channel.send({ embed });
        
  }
)
      reaction3.on("collect", r => {
        const embed = new Discord.RichEmbed().setColor("#000000")
          .setDescription(`
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
`);
      });
    });
  }
});
// Set the bot's presence (activity and status)
client.on("ready", () => {
    client.user.setPresence({
        game: {
            name: '.Invite | .help',
            type: 'WATCHING'
        },
        status: 'DND'
    })
});



client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "1help") {
    message.channel.send(
      `**| تــم رســال اوامــر الــعــامــه فــى الــخــاص ..**`
    );

    message.author.sendMessage(` ✽ **__ Earth Bot__**
**__الاوامر العامه__** 
**  .bot • لعرض معلومات عن البوت** 
**  .user • لعرض معلومات عنك** 
**  .avt • يعرض لك صورت  اي شخص عن طريق الايدي** 
**  .avatar • لعرض صورتك أو صورة الي تمنشنه** 
**  .color • لأختيار لونك في السيرفر **


`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "2help") {
    message.channel.send(
      `**| تــم رســال اوامــر الإداريــه فــى الــخــاص ..**`
    );
    
    message.author.sendMessage(` ✽ **__ Earth Bot__**
   **__الاوامر الإداريــه__** ✽ 
**  .clear • لمسح الشات** 
**  .ban • لتبنيد شخص** 
**  .kick • لاعطاء كيك لشخص** 
**  .open • لفتح الشات** 
**  .close • لقفل الشات** 
**  .mute • لاعطاء ميوت لشخص** 
**  .unmute • لفك ميوت عن شخص** 
**  .role all • لاعطاء رتبه للكل**  
**  .bc •  لأرسال برود كاست للكل**
**  .new •  فتح التكت**
**  .say • البوت يكرر كلامك**
**  .contact • ارسال اقتراح او لمراسلة صاحب البوت**
**  .move •  لسحب الشخص الى روومك**
**  .giveaway •   يسويلك قف اوي علي الشي الي تبيه**


`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "3help") {
    message.channel.send(
      `**| تــم رســال اوامــر الــمــوســيــقــى فــى الــخــاص ..**`
    );

    message.author.sendMessage(`  **__Earth Bot__**
  **__أوامر الــمــوســيــقــى__**   
**  في صيانة **
    
`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "4help") {
    if (message.author.id !== message.guild.owner.user.id) return message.channel.send(`**لا تستطيع استخدام هذا الامر**`);
    
    message.channel.send(
      `**| تــم رســال اوامــر الــحــمــايــة فــى الــخــاص ..**`
    );

    message.author.sendMessage(`**__Earth Bot__**
**__اوامر الــحــمــايــة__**  
**  .settings limitsban •  تحدد العدد الي تبيه لو حد بند  بيشتال رتبته **
**  .settings limitskick • تحدد العدد الي تبيه لو حد طرد 3 او 4 بيشتال رتبته **
**  .settings limitsroleD •  تحدد العدد الي تبيه لو حد مسح رول 3 او 4 بيشتال رتبته **
**  .settings limitsroleC •  تحدد العدد الي تبيه لو حد صنع روم 3 او 4 بيشتال رتبته **
**  .settings limitschannelD •  تحدد العدد الي تبيه لو حد مسح روم 3 او 4 بيشتال رتبته **
**  .settings limitstime •  تحديد الوقت الذي من خلالة يتم التبنيد كـ مثال اذا شخص بند 5 في دقيقة تنزل رتبتة**
**  .antibots on •  منع دخول بوتات**
**  .antibots off •  فتح دخول البوتات**
`);
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "5help") {
    
    message.channel.send(
      `**| تــم رســال اوامــر المميزة فــى الــخــاص ..**`
    );

    message.author.sendMessage(` **__ Earth Bot __**


** .createcolors • صنع ألوان **
** .colors • غير لونك ** 
** .inv • عدد الدعوات للسيرفر**
** .credits • لمعرفة رصيدكك ** 
** ملاحظة : \`البوت لايدعم زيادة الكريدت عن طريق التفاعل ، انما فقط من امر daily= كل 6 ساعات \`**
** .removecredits • لحذف كريدت من رصيدك ، لايمكنك حذف من شخص **
** مثال : \` =removecredits 500 \`**
** .addcredits • لـ أضافة كريدت لرصيدك ، لايمكنك اضافة لاحد فقط بالتحويل العادي **
** مثال : \`addcredits 500. \`**
** .setLog • تحديد روم اللوق**
** .setby • تحديد روم المغادرة**

`);
  }
});


client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
    message.channel.send(`  **__ Earth Bot __**> 
** Help Menu**
----------------------------
> ** .1help ** ** الاوامر العامه  **
> ** .2help ** ** الاوامر الإداريه  **
> ** .3help ** ** أوامر الموسيقى   **
> ** .4help ** ** أوامر الحماية (للاونر فقط)   **
> ** .5help ** ** اوامر مميزه  **
 **__Done__** 
   `);
  }
});



 client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send(`Processing .. Please wait.   :Genny:`).then(m => m.delete(1000));
        jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
});

const replyMSG = JSON.parse(fs.readFileSync("./replyMSG.json", "utf8")); // i dont wanna explain you are not my father!

function saveReplay() {
  fs.writeFile("./replyMSG.json", JSON.stringify(replyMSG), function(err) {
    if (err) throw err;
  });
}



client.on("ready", () => {
  var x = client.channels.get("620424484502896658");
  if (x) x.join();
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "color")) {
    if (!message.channel.guild)
      return message.channel
        .send("**هذا الأمر فقط للسيرفرات**")
        .then(m => m.delete(5000));
    message.channel.sendFile(`https://cdn.discordapp.com/attachments/647452214776037386/655398668236619777/PicsArt_12-14-04.19.57.jpg`).then(msg => {
      msg.react("🖤").then(r => {
        msg.react("❤").then(r => {
          msg.react("💛").then(r => {
            msg.react("💚").then(r => {
              msg.react("💙").then(r => {
                msg.react("🐸").then(r => {
                  msg.react("💩").then(r => {
                    msg.react("😡").then(r => {
                      msg.react("😈").then(r => {
                        msg.react("💀").then(r => {
                          msg.react("😜").then(r => {
                            msg.react("❌").then(r => {
                              let activeFilter = (reaction, user) =>
                                reaction.emoji.name === "🖤" &&
                                user.id === message.author.id;

                              let active = msg.createReactionCollector(
                                activeFilter,
                                { time: 15000 }
                              );

                              //red
                              active.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Black")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#000000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأسود**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //لون اسود

                              let y1Filter = (reaction, user) =>
                                reaction.emoji.name === "❤" &&
                                user.id === message.author.id;

                              let y1 = msg.createReactionCollector(y1Filter, {
                                time: 15000
                              });

                              //t
                              y1.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "D-Red")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FF0000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأحمر الغامق**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //لون احمر
                              let y2Filter = (reaction, user) =>
                                reaction.emoji.name === "💛" &&
                                user.id === message.author.id;

                              let y2 = msg.createReactionCollector(y2Filter, {
                                time: 15000
                              });

                              y2.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Yellow")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#e7fa02")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الاصفر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //الون الاخضر

                              let dgFilter = (reaction, user) =>
                                reaction.emoji.name === "💚" &&
                                user.id === message.author.id;

                              let dg = msg.createReactionCollector(dgFilter, {
                                time: 15000
                              });

                              dg.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "D-Green")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#09fa2a")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الاخضر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                              //الون اللبني

                              let aqFilter = (reaction, user) =>
                                reaction.emoji.name === "💙" &&
                                user.id === message.author.id;

                              let aq = msg.createReactionCollector(aqFilter, {
                                time: 15000
                              });

                              aq.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Aqua")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#00BFFF")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون اللبني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                              //الون الازرق فاتح

                              let grFilter = (reaction, user) =>
                                reaction.emoji.name === "🐸" &&
                                user.id === message.author.id;

                              let gr = msg.createReactionCollector(grFilter, {
                                time: 15000
                              });

                              gr.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Green")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#00FF00")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأخضر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let brFilter = (reaction, user) =>
                                reaction.emoji.name === "💩" &&
                                user.id === message.author.id;

                              let br = msg.createReactionCollector(brFilter, {
                                time: 15000
                              });

                              br.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Brown")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#3B170B")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون البني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let reFilter = (reaction, user) =>
                                reaction.emoji.name === "😡" &&
                                user.id === message.author.id;

                              let re = msg.createReactionCollector(reFilter, {
                                time: 15000
                              });

                              re.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Red")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FF0000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأحمر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let prFilter = (reaction, user) =>
                                reaction.emoji.name === "😈" &&
                                user.id === message.author.id;

                              let pr = msg.createReactionCollector(prFilter, {
                                time: 15000
                              });

                              pr.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Purple")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#A901DB")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأرجواني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let whFilter = (reaction, user) =>
                                reaction.emoji.name === "💀" &&
                                user.id === message.author.id;

                              let wh = msg.createReactionCollector(whFilter, {
                                time: 15000
                              });

                              wh.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "White")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#ffffff")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأبيض**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let orFilter = (reaction, user) =>
                                reaction.emoji.name === "😜" &&
                                user.id === message.author.id;

                              let or = msg.createReactionCollector(orFilter, {
                                time: 15000
                              });

                              or.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Orange")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FFBF00")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأرجواني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let y6Filter = (reaction, user) =>
                                reaction.emoji.name === "❌" &&
                                user.id === message.author.id;

                              let y6 = msg.createReactionCollector(y6Filter, {
                                time: 15000
                              });

                              y6.on("collect", r => {
                                message.member.removeRole(
                                  message.guild.roles.find("name", "black")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "D-Red")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Yellow")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "D-Green")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Aqua")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Green")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Brown")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Red")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Purple")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "White")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Orange")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("RANDOM")

                                  .setDescription("**:art:تم ازالة اللون**")
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
});

client.on("message", message => {
  if (message.content === prefix + "createcolors") {
    if (!message.channel.guild)
      return message.channel.send("**This Commnad only For Servers !**");

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel
        .send("**You Dont Have** `ADMINISTRATOR` **premission**")
        .then(msg => msg.delete(6000));
    message.guild.createRole({
      name: "Black",
      color: "#000000",
      permissions: []
    });
    message.guild.createRole({
      name: "D-Red",
      color: "#e64d62",
      permissions: []
    });
    message.guild.createRole({
      name: "Yellow",
      color: "#ffea35",
      permissions: []
    });
    message.guild.createRole({
      name: "D-Green",
      color: "#bce86d",
      permissions: []
    });
    message.guild.createRole({
      name: "Aqua",
      color: "#5dafdf",
      permissions: []
    });
    message.guild.createRole({
      name: "Green",
      color: "#70ca70",
      permissions: []
    });
    message.guild.createRole({
      name: "Brown",
      color: "#9a5746",
      permissions: []
    });
    message.guild.createRole({
      name: "Red",
      color: "#ff0025",
      permissions: []
    });
    message.guild.createRole({
      name: "Purple",
      color: "#aa8fd6",
      permissions: []
    });
    message.guild.createRole({
      name: "White",
      color: "#f9f9f9",
      permissions: []
    });
    message.guild.createRole({
      name: "Orange",
      color: "#ffcc4d",
      permissions: []
    });

    message.channel.sendMessage({
      embed: new Discord.RichEmbed()
        .setColor("#502faf")
        .setAuthor(`${message.author.username}'`, message.author.avatarURL)
        .setDescription("``الالوان قيد الانشاء ....``")
    });
  }
});


//If You want to remove //R.I.P Royal Bot! this message just click ctrl + h and replace this message to nothing

client.on("message", message => {
  var prefix = "."; //prefix
  if (!replyMSG[message.author.id])
    replyMSG[message.author.id] = {
      contentmessage: "none",
      replayMessage: "none"
    };
  saveReplay();

  if (message.content.startsWith(prefix + "reply")) {
    if (message.author.bot || message.channel.type == "dm") return undefined;

    let contmessage;

    let filter = m => m.author.id === message.author.id;
    message.channel.send(" |** من فضلك اكتب الرساله الان...** ").then(msg => {
      message.channel
        .awaitMessages(filter, {
          //R.I.P Royal Bot!
          maxMatches: 1,
          time: 12000,
          errors: ["time"]
        })

        .then(collected => {
          contmessage = collected.first().content;
          msg.edit(":scroll: | من فضلك اكتب الرد الان... :pencil2: ");

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 12000,
              errors: ["time"]
            })

            .then(collectedd => {
              replyMSG[message.author.id] = {
                contentmessage: contmessage,
                replayMessage: collectedd.first().content
              };
              saveReplay();
              var embed1 = new Discord.RichEmbed()
                .setTitle(`Done The Autoreply Setup`)
                .setThumbnail(message.author.avatarURL)
                .setColor("GRAY")
                .setDescription(
                  `
                    Message:
                    ${contmessage}
                    Reply:
                    ${collectedd.first().content}`
                )
                .setFooter(client.user.username, client.user.avatarURL);
              msg.edit("  |** تم الاعداد بنجاح...** ");

              message.channel.send(embed1);
            });
        });
    });
  }
});

client.on("message", message => {
  let messagecontent = replyMSG[message.author.id].contentmessage;
  let reply = replyMSG[message.author.id].replayMessage;
  if (message.content == messagecontent) {
    if (messagecontent == "none" || reply == "none") return undefined;
    message.channel.send(reply);
  }
});

      client.on('message', message => {
          if(!profile[message.author.id]) profile[message.author.id] ={
              points: 0,
              level: 1,
              rep: 0,
              tite: "No Title"
          };
          if(message.author.bot) return;
          profile[message.author.id].points = Math.floor(profile[message.author.id].points+1);
          if(profile[message.author.id].points > 250) {
              profile[message.author.id].points = 0
              profile[message.author.id].level = Math.floor(profile[message.author.id].level+1);
              message.channel.send(`**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`)
          }
          fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      })
 
    client.on('message', message => {
        let tit = message.content.split(" ").slice(1).join(" ");
        if(message.content.startsWith(prefix + "title")) {
        if(!profile[message.author.id].tite) profile[message.author.id].tite = "Hey im using Super"
        if(!tit) {
            message.channel.send("**Usage: <title <something>**");
        } else {
            profile[message.author.id].tite = tit
            message.channel.send(`:ok:`)
        }
        }
        fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
    })
 
client.on('message', message => {
 
    if(message.content.startsWith(prefix + 'rep')) {
      if(!message.channel.guild) return;
                    moment.locale('en');
                  var getvalueof = message.mentions.users.first()
                    if(!getvalueof) return message.channel.send(`**:mag: |  ${message.author.username}, the user could not be found.    **`);
                       if(getvalueof.id == message.author.id) return message.channel.send(`**${message.author.username}, you cant give yourself a reputation !**`)
    if(profile[message.author.id].reps != moment().format('L')) {
            profile[message.author.id].reps = moment().format('L');
            profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep+1);
         message.channel.send(`** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`)
        } else {
         message.channel.send(`**:stopwatch: |  ${message.author.username}, you can raward more reputation  ${moment().endOf('day').fromNow()} **`)
        }
       }
       fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});

    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "profile")) {
                               let user = message.mentions.users.first();
         var men = message.mentions.users.first();
            var heg;
            if(men) {
                heg = men
            } else {
                heg = message.author
            }
          var mentionned = message.mentions.members.first();
             var h;
            if(mentionned) {
                h = mentionned
            } else {
                h = message.member
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
  let mention = message.mentions.users.first() || message.author;
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "No Reps", credits: 1, level: 1,tite: "Earth Bot User", rep: 0, lastDaily: "NOT COLLECTED"};
            let Image = Canvas.Image,
            canvas = new Canvas.createCanvas(300, 300),
            ctx = canvas.getContext('2d');
            fs.readFile("Pic.jpg", function (err, Background) { //امتداد الصورة
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
 
})
 
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#000000"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 153, 104) // احداثيات اسمك
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 151, 102) // احداثيات اسمك
 
                        //credit
                        ctx.font = "bold 10px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`$${credits[mention.id].credits}`, 230, 182) // احداثيات المصاري
 

                        ctx.font = "bold 14px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '12px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[mention.id].tite}`, 150, 130) // احداثيات المصاري
 
                        //Level
                        ctx.font = "bold 24px kathen" // نوع الخط و حجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].level}`, 70, 78) // احداثيات اللفل
 
                         //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#000000" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        // REP
                        ctx.font = "bold 20px  kathen";
                        ctx.fontSize = "50px";
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`+${profile[mention.id].rep}`, 225, 76)
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 110, 29, 82, 60);
 
message.channel.startTyping()
message.channel.sendFile(canvas.toBuffer())
message.channel.stopTyping()
})
})
}
});




let BTO_OWNERS  = ['471795779867115540','388702736968843264' ]
client.login('NjU0NTk3ODgwNjEwMjkxNzIy.XfH4Hw.xGM4MxfKYiB-T344kPaYgBw-0Zg');