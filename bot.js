const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
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
fs.readdir("./komutlar/", (err, files) => {
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
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\


//----------------------------------Özel oda sistemi Son----------------------------//

///////////////////////////////////////////////////////////////////

client.on("messageDelete", async message => {
  // mod-log
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setTitle("MESAJ SİLİNDİ")
    .setDescription(
      `<@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`
    )
    .setFooter("Diablo | Log Sistemi");
  modlogkanal.sendEmbed(embed);
});

client.on("guildBanAdd", async message => {
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")

    .setDescription(
      `Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`
    )
    .setThumbnail(message.user.avatarURL)
    .setFooter("Diablo | Log Sistemi");
  modlogkanal.sendEmbed(embed);
});
client.on("channelCreate", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`${channel.name} adlı metin kanalı oluşturuldu.`)
      .setFooter(`Diablo | Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setTitle("SES KANALI OLUŞTURULDU")
      .setDescription(`${channel.name} adlı ses kanalı oluşturuldu!`)
      .setFooter(`Diablo | Log Sistemi Kanal ID: ${channel.id}`);

    modlogkanal.send({ embed });
  }
});
client.on("channelDelete", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`${channel.name} adlı metin kanalı silini!`)
      .setFooter(`Diablo | Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setTitle("SES KANALI SİLİNDİ")
      .setDescription(`${channel.name} adlı ses kanalı silindi`)
      .setFooter(`Diablo | Log Sistemi  Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`tc-modlog_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(
    db
      .fetch(`tc-modlog_${oldMsg.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .addField("Kullanıcı", oldMsg.author.tag, true)
    .addField("Eski Mesaj", `  ${oldMsg.content}  `)
    .addField("Yeni Mesaj", `${newMsg.content}`)
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

///////////////////////////////////////////////////////////////

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let kullanici = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("GREEN")
            .setFooter("Fynx Store  BOT", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (1/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("GREEN")
            .setFooter("Creative BOT ", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (2/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam kick sistemi`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("GREEN")
            .setFooter("Fynx Store  BOT", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> 3 Adet Reklam Uyarısı Aldığı İçin Kicklendi. Bir Kez Daha Yaparsa Banlanacak`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Reklam ban sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("GREEN")
            .setFooter("Fynx Store BOT", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Kick Yedikten Sonra Tekrar Devam Ettiği İçin Banlandı.`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

/////////////////////////////////////////

client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi**"
          )
          .setColor("GREEN")
          .setFooter(`Fynx Store Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi**`
          )
          .setColor("GREEN")
          .setFooter(`Fynx Store  Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});

///////////////////////////////////////////
// OTO TAG BY MİRAN.JS CODEMİNG
client.on("guildMemberAdd", async member => {
  let codeming = await db.fetch(`ototag_${member.guild.id}`);
  let miran = await db.fetch(`ototagk_${member.guild.id}`);
  if (!codeming) return;
  //if (!kanal) return;{}
  if (miran) {
    member.setNickname(`${codeming} | ${member.user.username}`);
    const amil = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`**@${member.user.tag}** Adlı Kişiye tag verildi!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(miran).send(amil);
    return;
  } // eğer kanal varsa kanala atıp isim değişitiricek
  else if (!miran) {
    member.setNickname(`${codeming} | ${member.user.username}`);
    return;
  } // eğer kanal yoksa sadece isim değiştiricek
});

////////////////////////////////////////

/////////////////////////////

let kufurEngel = JSON.parse(
  fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8")
);
client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === "kapali") return;
  if (kufurEngel[msg.guild.id].küfürEngel === "acik") {
    const kufur = [
      "mk",
      "amk",
      "yaragim",
      "aq",
      "orospu",
      "oruspu",
      "oç",
      "sikerim",
      "yarrak",
      "piç",
      "sikik",
      "ibne",
      "amcik",
      "amq",
      "sik",
      "amcık",
      "am biti",
      "yarrak",
      "pezevenk",
      "gavat",
      "yavşak",
      "çocu",
      "orospu çocukları",
      "sex",
      "göt",
      "ibne",
      "şerefsiz",
      "kahpe",
      "annesiz",
      "seks",
      "o.ç",
      "amına",
      "orospu çocuğu",
      "sg",
      "siktir git",
      "porno",
      "Porno",
      "PORNO",
      "OÇ",
      "OROSPU",
      "PİÇ",
      "ANNENİN AMI",
      "YARRAĞIM",
      "SİKİŞ",
      "VAJİNA",
      "PENİS",
      "BOŞAL",
      "BOŞALT",
      "boşal",
      "boşalt",
      "ananı"
    ];
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg
          .reply("**Hey Dostum Bu Sunucuda Küfür Yasak ⚠️**")
          .then(message => message.delete(50000));
      }
    }
  }
});
/////////////////////

//////////////////////
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  const channel = member.guild.channels.find("name", "KAYIT KANALI İSMİ");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Fynx | Kayıt Sistemi`)
    .addField(
      `Fynx Sınır Kapısına Hoş Geldin`,
      `**Hoşgeldin** ${member} **Seninle \`${member.guild.memberCount}\` Kişiyiz**`
    )
    .addField(
      `Kayıt Olmak İçin`,
      `**İsmini ve Yaşını Yaz │ Kayıt Ekibimiz  İlgilenecektir**`
    );
  channel.sendEmbed(embed);
});
