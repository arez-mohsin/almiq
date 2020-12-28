//=============================== - [ Consts ] - ===================================
const Discord = require("discord.js");

const bot = new Discord.Client();

const { Util } = require("discord.js");

const timezone = require("moment-timezone");

const YouTube = require("simple-youtube-api");

const fs = require("fs");

const request = require("request");

const bannedwords = ["@here", "@everyone"];

const ytdl = require("ytdl-core");

const prefix = "+";

const queue = new Map();
bot.on("ready", () => console.log("🤖Ready Bot In Online🤖"));

bot.on('message', message => {
    if (message.content === prefix + "help") {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
     .setThumbnail("https://cdn.discordapp.com/avatars/735954747076378814/e635a56a7eb88955ce276473f938fa6e.png?size=1024")
    .setImage("https://cdn.discordapp.com/avatars/735954747076378814/e635a56a7eb88955ce276473f938fa6e.png?size=1024")
    .setColor("#000000")
.setDescription(` **COMAND HELP MENU**
< The prefix for the bot is: s! >
+antibots on
+antibots off
+anti ban {Number}
+anti kick {Number}
+anti roleC {Number}
+anti roleD {Number}
+anti channelC {Number}
+anti channelD {Number}
+anti time
+invite
*about
**[support](https://discord.gg/3MMFZRp)**  -  **[invite](https://discord.com/api/oauth2/authorize?client_id=735954747076378814&permissions=8&scope=bot)**  
`)
 
    .setTimestamp()
    
    
    message.channel.sendEmbed(embed);
  }
});
bot.on('message', message => {
  if (message.content.startsWith(prefix+"about")) {
  message.channel.send({
  embed: new Discord.RichEmbed()
     .setAuthor(bot.user.username,bot.user.avatarURL)
     .setThumbnail(bot.user.avatarURL)
     .setColor('#00001')
     .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
     .addField('``servers``', [bot.guilds.size], true)
     .addField('``Users``' ,`[ ${bot.users.size} ]` , true)
     .addField('``Name Bot``' , `[ ${bot.user.tag} ]` , true)
     .addField('``iD Bot``' , `[ ${bot.user.id} ]` , true)
           .addField('``My Prefix``' , `${prefix}` , true)
     .addField('``My Language``' , `[ Java Script ]` , true)
    
    
    
    
    
    
    .setFooter('By | <! Cg》 AR0#0001>')
    
    
    
    
  })
    
    
    
    
  }
  });


///////////
bot.on('message', message => {
var prefix = "+";
       if(message.content === prefix + "+lock") {
                           if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false

              }).then(() => {
                  message.reply("**OK CHANNEL LOCK **")
              });
                }

    if(message.content === prefix + "+unlock") {
                        if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true

              }).then(() => {
                  message.reply("**OK CHANNEL UNLOCK**")
              });
    }
       
});



/////////




bot.on("ready", () => {
  bot.user.setActivity("s!help It's time to secure your server!", { type: "PLAYING" });
  bot.user.setStatus();
});















bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("ready", () => {
  console.log(`[!]-------------------------------------[!]`);
  console.log(`Display Name : ${bot.user.username}`);
  console.log(`Public Prefix : ${prefix}`);
  console.log(`Version : 0.0.1`);
  console.log(`[!]-------------------------------------[!]`);
});

const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.listen(process.env.PORT);
function t_c() {
  request.get(
    `https://${process.env.PROJECT_DOMAIN}.glitch.me/`,
    (error, response, body) => {
      let AGRIN = body;
      return AGRIN;
    }
  );
}
setInterval(t_c, 60000);

bot.on("ready", () => {
  bot.user.setActivity("s!help It's time to secure your server!", {
    type: ""
  });
  bot.user.setStatus();
});
let anti = JSON.parse(fs.readFileSync("./antigrefff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./server.json", "UTF8"));
bot.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "anti")) {
    if (message.author.id !== message.guild.owner.user.id)
      return message.channel.send(
        "**closed_lock_with_key just Ownership can on**"
      );
    if (message.content.startsWith(prefix + "anti ban")) {
      if (!num) return message.channel.send("[1 to 3]|justnumbersend! **");
      if (isNaN(num)) return message.channel.send("[1 to 3] |  justnumber! **");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `** lock = | changed: ${config[message.guild.id].banLimit} **`
      );
    }
    if (message.content.startsWith(prefix + "anti kick")) {
      if (!num) return message.channel.send(" [1 to 3]| justnumbersend!  **");
      if (isNaN(num)) return message.channel.send("[1 to 3] |justnumber ! **");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `** lock = |changed  : ${config[message.guild.id].kickLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "anti roleC")) {
      if (!num) return message.channel.send("[1 to 3] | justnumbersend!**");
      if (isNaN(num))
        return message.channel.send("[1 to 3]| justnumbersend!**");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `** lock = |changed : ${config[message.guild.id].roleDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti roleD")) {
      if (!num) return message.channel.send("[1 to 3]| justnumbersend! **");
      if (isNaN(num))
        return message.channel.send(" [1 to 3]| justnumbersend!**");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `** lock = |  changed: ${config[message.guild.id].roleCrLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "anti channelC")) {
      if (!num) return message.channel.send("[1 to 3] |justnumbersend! **");
      if (isNaN(num)) return message.channel.send(" [1 to 3]| justnumber! **");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `** lock = | changed: ${config[message.guild.id].chaDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti channelD")) {
      if (!num) return message.channel.send(" [1 to 3]| justnumbersend! **");
      if (isNaN(num)) return message.channel.send(" [1 to 3]|justnumber ! **");
      config[message.guild.id].chaCrLimit = num;
      message.channel.send(
        `** lock = | changed : ${config[message.guild.id].chaCrLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti time")) {
      if (!num) return message.channel.send(" [1 to 3]| justnumbersend! **");
      if (isNaN(num)) return message.channel.send(" [1 to 3]|justnumber ! **");
      config[message.guild.id].time = num;
      message.channel.send(
        `** lock = | changed: ${config[message.guild.id].time}**`
      );
    }
  }
  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});
bot.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("test");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} he cleaned alot of rooms **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

bot.on("channelCreate", async channel => {
  if (!["text", "category", "voice"].includes(channel.type.toLowerCase()))
    return;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;

  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("test");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaCrLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username}   he made alot of channels**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
bot.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("test");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} ‎ he made alot of roles**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

bot.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("test");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username}he cleaned alot of roles **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

bot.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log("ban: " + entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`**⇏ | ${entry.username} he tried everone ban **`)
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

bot.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      chaCrLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 30
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("test");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`**⇏ | ${entry.username} he tried everone kick**`)
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

bot.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.guild.id])
      config[member.guild.id] = {
        banLimit: 2,
        chaDelLimit: 2,
        chaCrLimit: 2,
        roleDelLimit: 2,
        kickLimits: 2,
        roleCrLimits: 2,
        time: 30
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("test");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000 || 30000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(`**⇏ | ${entry.username} he tried everone kick**`)
          );
        anti[member.guild.id + entry.id].actions = 0;
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
          e
        ) {
          if (e) throw e;
        });
        fs.writeFile(
          "./antigreff.json",
          JSON.stringify(anti, null, 2),
          function(e) {
            if (e) throw e;
          }
        );
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
//=========={Anit-Bot}========//

let antibots = JSON.parse(fs.readFileSync("./antibot.json", "utf8")); //require antihack.json file
bot.on("message", message => {
  if (message.content.startsWith(prefix + "antibots on")) {
    if (!message.member.hasPermission("Ownership")) return message.reply(":");
    antibots[message.guild.id] = {
      onoff: "On"
    };
    message.channel.send(`** You have disabled anti bot!**`);
    fs.writeFile("./antibot.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
//antihack with ON , OFF ! RARE CODE
//LIKE PLUSBOT !

bot.on("message", message => {
  if (message.content.startsWith(prefix + "antibots off")) {
    if (!message.member.hasPermission("Ownership")) return message.reply("");
    antibots[message.guild.id] = {
      onoff: "Off"
    };
    message.channel.send(`**You have enabled anti bot! **`);
    fs.writeFile("./antibot.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
bot.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id])
    antibots[member.guild.id] = {
      onoff: "Off"
    };
  if (antibots[member.guild.id].onoff === "Off") return;
  if (member.user.bot) return member.kick();
});

fs.writeFile("./antibot.json", JSON.stringify(antibots), err => {
  if (err)
    console.error(err).catch(err => {
      console.error(err);
    });
});
//////===============linke bot========================\\\\\
bot.on("message", message => {
  if (message.content === "+invite") {
    if (!message.channel.guild) return message.reply("****");
    let embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTitle("=--> link security bot server <--=")
      .setURL();
    "https://discord.com/api/oauth2/authorize?client_id=735954747076378814&permissions=8&scope=bot"
      // Type Your Link here after ''
      .setFooter("BOT NAME", message.author.avatarURL);
    message.channel.sendEmbed(embed);
  }
});






 
//////============token================////
bot.login("NzM0OTQ5MDU0NzQzNTc2Njg3.XxZIpQ.xZJf8EF4CfMERNli5lJRKAG3_Qk");
//by AGRIN
