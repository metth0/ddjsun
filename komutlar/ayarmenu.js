const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('PURPLE')
.addField('Diablo Genel Ayar Menüsü',`
**:white_small_square: = \`+sayaç\` : Sunucunuza Sayaç Kurar!**
**:white_small_square: = \`+otorol ayarla\` : Gelen Herkese ROL Verir!**
**:white_small_square: = \`+ban\` : İstediğiniz Kişiyi Banlarsınız!**
**:white_small_square: = \`+kick\` : İstediğiniz Kişiyi Kicklersiniz!**
**:white_small_square: = \`+ototag\` : Oto Tag Ayarlar!**
**:white_small_square: = \`+sil 1-100\` : Belirtilen Kadar Mesaj Siler! **
**:white_small_square: = \`+özelodasistemi\` : 2-3-4 ve 5 Kişilik Özel Odalar Kurar! **`)
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
