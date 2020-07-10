const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('GREEN')
.addField('GameR Fest BOT Yardım Menüsü',`
**:white_small_square: = \`-ayarlar\` : Moderasyon Komutlarını Açar**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["help","y"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
}; 