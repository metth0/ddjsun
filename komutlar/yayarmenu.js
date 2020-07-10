const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('PURPLE')
.addField('Diablo Bot Moderasyon Menüsü',`
**:white_small_square: = \`+sayaç\` : Sunucunuza Sayaç Kurar**
**:white_small_square: = \`+yavaşmod\` : Sohbet Kanalına Sayaç Ekler**
**:white_small_square: = \`+modlog\` : Sunucunuzun Denetim Kaydını Tutar**
**:white_small_square: = \`+reklamkick\` : Reklam Yapanları Kickler**
**:white_small_square: = \`+otorol ayarla\` : Gelen Herkese ROL Verir**
**:white_small_square: = \`+ban\` : İstediğiniz Kişiyi Banlarsınız**
**:white_small_square: = \`+kick\` : İstediğiniz Kişiyi Kicklersiniz**
**:white_small_square: = \`+küfür-engel\` : Sunucunuzda Küfür Engel Açarr**
**:white_small_square: = \`+sil 1-100\` : Belirtilen Kadar Mesaj Siler **`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["settings","a"], 
  permLevel: 0
};
exports.help = {
  name: 'ayarlar'
}; 
