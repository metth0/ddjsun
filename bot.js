const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
client.on('ready', ()=>{
client.channels.get('731183858791219241').join()
})

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kurulum") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send("Sunucu Zaten Ayarlanmış")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **kabul** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kullanabilir");
      message.channel.awaitMessages(response => response.content === 'kabul', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
        
         message.guild.owner.send('Heyo, Sunucunuz Kuruluyor... Bu Biraz Zaman Alabilir!')
       message.guild.channels.forEach(function(kan) {
       message.guild.roles.forEach(function(rol) {
                 kan.delete()
                 rol.delete()
       })}) 
        
        
   message.guild.createChannel('✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])


        
 message.guild.createChannel('【📃 】кυяαℓℓαя', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
 message.guild.createChannel('「💚」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
       message.guild.createChannel('【👑】sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
             message.guild.createChannel('【🎉】çєкιℓιş', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
            message.guild.createChannel('【📢 】∂υуυяυℓαя', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
        
                    message.guild.createChannel('【🎀】ραятηєя', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
        

       }) 
       .then((collected) => {
        message.guild.createChannel('✮ ▬  ▬ Metin Kanalları▬  ▬ ✮', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`【🎁】şikayet-ve-öneriler`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【👥】video-duyurular`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【📷】galeri-odası`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【🤖】bot-komut`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【👻】sohbet-odası`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));

      message.guild.createChannel(`🌹》Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Ses Kanalları▬  ▬ ✮|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('|▬▬|Ses Kanalları|▬▬|', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`👍》Sesli Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Ses Kanalları|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬》Sesli Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Ses Kanalları|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})



       message.guild.owner.send("Gerekli Herşey Kuruldu Rahatına Bak! **Diablo Bot**")
     
            })   
    
}
});