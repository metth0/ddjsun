const Discord = require('discord.js');
const db = require('quick.db');
exports.run = (client, message, args) => {

     let user = message.mentions.users.first()  
 
  let hata3 = new Discord.RichEmbed()
 .setTitle('Diablo Bot')
 .setDescription(message.member.user.username + '\n **-ban <kullanıcı>** şeklinde olmalı!')
 .setColor('PURPLE')


  let hata4 = new Discord.RichEmbed()
 .setTitle('Diablo Bot')
 .setDescription(message.member.user.username + ', yetkilileri yasaklayamassın!')
 .setColor('PURPLE')
.setFooter('Ne kadar tuhaf dimi?')




let hata2 = new Discord.RichEmbed()
 .setTitle('Diablo Bot')
 .setDescription(message.member.user.username + ' Sunucudan Birini yasaklamak için **"ÜYELERİ ENGELLE"** Yetkisinesahip olman gerekiyor.')
 .setColor('PURPLE')
 


///////////////////////////////////////////////////ing


if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(hata2) 
if (message.mentions.users.size < 1) return message.channel.sendEmbed(hata3)    
if (message.guild.member(user).hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(hata4)      
    

     
 
    message.channel.send('**' + user + '**,**' + message.member.user.username + '** Tarafından Yasaklandı!')
 message.guild.ban(user, 2);
    
  
 

 

    
   
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'ban atmak',
  usage: 'ban'
};