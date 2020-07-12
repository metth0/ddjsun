const Discord = require('discord.js'),
      db = require('quick.db'),
      ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
const diablo_sayı = args[1]
const diablo_kanal = message.mentions.channels.first()
if(!diablo_sayı || !diablo_kanal) return message.reply(`Sayaç Sistemini Ayarlamak İçin Lütfen Sayı ve Kanal Belirtiniz. **Örn** : \`${prefix}sayaç #kanal 100\``)
if(isNaN(diablo_sayı)) return message.reply(`Sayaç Sistemini Ayarlamak İçin Sayıyı Sadece Rakamlardan Yazmalısın!`)
  
await db.set(`diablo+SayaçSayı_${message.guild.id}`,diablo_sayı)  
await db.set(`diablo+SayaçKanal_${message.guild.id}`,diablo_kanal.id)  
  
message.reply(`Sayaç Başarıyla Ayarlandı!`)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'sayaç',
  description: 'Sayaç Sistemi - Diablo',
  usage: 'sayaç <#kanal> <sayı>'
};