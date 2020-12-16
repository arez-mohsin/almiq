const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");
const moment = require("moment");
const zalgo = require("zalgolize");
const math = require("math-expression-evaluator");
const figlet = require("figlet");
const fs = require("fs");
const ms = require("ms");
const prefix = "a!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("a!help | it’s time to secure your server!", { type: "Playing" });
  console.log("");
  console.log("");
  console.log(
    "╔[═════════════════════════════════════════════════════════════════]╗"
  );
  console.log(`[Start] ${new Date()}`);
  console.log(
    "╚[═════════════════════════════════════════════════════════════════]╝"
  );
  console.log("");
  console.log("╔[════════════════════════════════════]╗");
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log("");
  console.log("Informations :");
  console.log("");
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log("╚[════════════════════════════════════]╝");
  console.log("");
  console.log("╔[════════════]╗");
  console.log(" Bot Is Online");
  console.log("╚[════════════]╝");
  console.log("");
  console.log("");
});

const anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8")); // create antigreff.json file with {} inside it
const config = JSON.parse(fs.readFileSync("./config.json", "UTF8")); // create config.json file with


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

client.on("message", message => {
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
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "settings ")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    if (message.content.startsWith(prefix + "settings ban")) {
      if (!num)
        return message.channel.send("--> | Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command !  ");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `-->| Changed To : ${config[message.guild.id].banLimit} `
      );
    }
    if (message.content.startsWith(prefix + "settings kick")) {
      if (!num)
        return message.channel.send("--> | Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command ! ");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `--> | Changed To: ${config[message.guild.id].kickLimits}`
      );
    }
    if (message.content.startsWith(prefix + "settings roleD")) {
      if (!num)
        return message.channel.send("-->| Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command ! ");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].roleDelLimit}`
      );
    }
    if (message.content.startsWith(prefix + "settings roleC")) {
      if (!num)
        return message.channel.send("--> | Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command ! ");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].roleCrLimits}`
      );
    }
    if (message.content.startsWith(prefix + "settings channelD")) {
      if (!num)
        return message.channel.send("--> | Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command ! ");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].chaDelLimit}`
      );
    }
    if (message.content.startsWith(prefix + "settings time")) {
      if (!num)
        return message.channel.send("--> | Type numbers after the command ! ");
      if (isNaN(num))
        return message.channel.send("--> | Type numbers after the command ! ");
      config[message.guild.id].time = num;
      message.channel.send(` | Changed To: ${config[message.guild.id].time}`);
    }
    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
    console.log("TETS");
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
            `--> | ${entry.username} tried to delete many channels`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
    console.log("TETS");
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
            `--> | ${entry.username} tried to delete many roles `
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
            `--> | ${entry.username} tried to create many roles`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`--> | ${entry.username} Tried to ban all memebers `)
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`--> | ${entry.username} tried to ban all memebers `)
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberRemove", async member => {
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
    if (!config[member.id])
      config[member.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `--> | ${entry.username} tried to ban all memebers `
            )
          );
        anti[member.guild.id + entry.id].actions = "0";
        fs.writeFile("./config.json", JSON.stringify(config), function(e) {
          if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
          if (e) throw e;
        });
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
});
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);

  client.user.setActivity("a!help | it’s time to secure your server!", { type: "Playing" });
});

///////////////security///////////////////



client.on('message', message => {
var prefix = "a!" ;
if (message.content.startsWith(prefix + "help")) {
let embed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setThumbnail(message.author.avatarURL)
.setImage('https://media.discordapp.net/attachments/740670480297754625/752146585323831346/image0.png')
.setTitle('__**command security**__' )
.setDescription(`**
\` a!\` : antibots on

\` a!\` : antibots off 

\` a!\`: settings ban { Number }

\` a!\` : settings kick { Number }

\` a!\` : settings roleD { Number }

\` a!\` : settings roleC { Number }

\` a!\` : settings channelD { Number }

\` a!\` : settings time { Number }

\` a!\` : about

\` a!\` : invite

\` a!\` : lock

\` a!\` : unlock
**`)
 
 
.setColor('RANDOM')
      .setTimestamp()

message.channel.sendEmbed(embed);
    }
});


//////===============linke bot========================\\\\\
client.on("message", message => {
  if (message.content === "a!invite") {
    if (!message.channel.guild)
      return message.reply(
        "**Please Do not type bot commands in bot private chat**"
      );
    let embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle(" Click here to Link bot ✔")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=740305582145405051&permissions=8&scope=bot"
      ) // Type Your Link here after ''
      .setThumbnail(
        "https://media.discordapp.net/attachments/740670480297754625/752146585323831346/image0.png"
      )

      .setFooter("Security#8471", message.author.avatarURL);
    message.channel.sendEmbed(embed);
  }
});

////////////  BORAGRTNI REKLAM SERVAR  /////////////

client.on('message', message => {

if(message.content.includes("@everyone")){
if(!message.member.hasPermission('MANAGE_MESSAGES')){
message.delete(); 
message.reply("! You don't have manage_message permission")
}

}

});
///////////  DAXSTNU KRDNAWAY ZHURAKAN  ////////////


client.on("message", message => {
let ToOFaN
if (message.content === "a!lock") {
if (!message.channel.guild)
return message.reply("ئەم فرمانە تایبەتە بە سێرڤەر");
if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply("||ببورە تۆ ئەم ڕۆڵەو پێ نیە|| ```MANAGE MESSAGES```");
message.channel
.overwritePermissions(message.guild.id, {
SEND_MESSAGES: false
})
.then(() => {
message.reply("∅بەسەرکەوتوانە داخرا");
});
}

if (message.content === "a!unlock") {
if (!message.channel.guild)
return message.reply("** This command only for servers**");
if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply("**__توانات نیە بیکەیتەوە چونکە ڕۆڵەکەی تۆ ```MANAGE_MESSAGES``پێ نیە**");
message.channel
.overwritePermissions(message.guild.id, {
SEND_MESSAGES: true
})
.then(() => {
message.reply("✓ بە سەرکەوتوی کرایەوە ");
});
}
});
////////////////   ZANYARE LASAR BOTAKA  /////////////

client.on("message", zaid => {
if (zaid.content === "a!about") {
const bot = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setColor("#00000")
.addField(
"**____Bot Ping____**: ",
` ${Date.now() - zaid.createdTimestamp}` + "__ __ ",
true
)
.addField("**__Servers__** : ", `→ ${client.guilds.size}`, true)
.addField("**__Channels__** : ", `→ ${client.channels.size} `, true)
.addField("**__users__** : ", `→ ${client.users.size} `, true)
.addField("**__Bot Name__** : ", `→ ${client.user.tag} `, true)
.addField("**Bot Owner** : ", `→ <@698505756898623529>`,)

.setImage(
"https://media.discordapp.net/attachments/737273404247244911/752500396060180480/image0.gif"
)
.setFooter(zaid.author.username, zaid.author.avatarURL);
zaid.channel.send(bot);
}
});
//////////////// Bot All Server  / ////

 client.on("message", message => {
  if (message.content == "Bot All Server") {
    if (!message.author.id === "382293804671172620") return;
    var gimg;
    var gname;
    var gmemb;
    var gbots;
    var groles;
    var servers = client.guilds;
    servers.forEach(g => {
      gname = g.name;
      gimg = g.iconURL;
      gmemb = g.members.size;
      gbots = g.members.filter(m => m.bot).size;
      groles = g.roles.map(r => {
        return r.name;
      });
      let serv = new Discord.RichEmbed()
        .setAuthor(gname, gimg)
        .setThumbnail(gimg)
        .addField("Server bots", gbots)
        .addField("Server Member Count", (gmemb = g.members.size))
        .setColor("RANDOM");
      message.channel.send(`
    Server Name : **${gname}**
    Server MemberCount : **${gmemb} **
            
            `);
      message.channel.sendEmbed(serv);
    });
  }
})

client.login("NzYxNzc3ODI5NjI0Njc2MzYy.X3fi4w.ogryg8JPeHCLNhS2DfvOe9-QOGQ");
