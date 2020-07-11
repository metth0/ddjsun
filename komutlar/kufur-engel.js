const Discord = require('discord.js');
const fs = require('fs');
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:fire: Yeterli yetki, bulunmamakta!`);

    let args = message.content.split(' ').slice(1);
    const secenekler = args.slice(0).join(' ');

    var errembed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(`Yanlış kullanım tespit edildi! **Doğrusu -küfür-engel aç/kapat**`)
    if(secenekler.length < 1) return message.channel.send(errembed);
    //if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
      if(secenekler.length < 1) return message.reply("Aktif hale getirmek için -küfür-engel aç & -küfür-engel kapat").then(m => m.delete(100000));

    message.delete();

            if (secenekler === "aç") {
        message.channel.send(`Küfür Engelleme Sistemi: **Açıldı!** Küfür içeren mesajlar engellenecektir`).then(m => m.delete(10000));
        küfürEngel[message.guild.id] = {
            küfürEngel: "acik"
          };

          fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
            if (err) console.log(err)
          });
    };

    if (secenekler === "kapat") {
        message.channel.send(`Küfür Englleme Sistemi: **Kapatıldı!** Sunucuda herkes küfür edebilir`).then(m => m.delete(10000));
        küfürEngel[message.guild.id] = {
            küfürEngel: "kapali"
          };

        fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
            if (err) console.log(err)
          });
    };
}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['-küfür-engel'],
        permLevel: 3
      };
      
      exports.help = {
        name: 'küfür-engel',
        description: 'Küfür engelleme sistemini, açıp kapatmanızı sağlar.',
        usage: 'küfür-engel <aç> veya <kapat>'
      };
