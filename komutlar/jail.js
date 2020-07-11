const Discord = require('discord.js');
     
exports.run = async (client, message, args) => {
  
if(!message.member.roles.has('ROLİD')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')  //ROLID yazan yerede jail atabilecekler rolün id sini koyun.
let jail = 'ROLİD' //buraya etiketlenen kullanıcıya verilecek rolün id sini koyun.
let kullanıcı = message.mentions.members.first()
if(!kullanıcı) return message.channel.send('Lütfen hapis edeceğiniz kullanıcıyı etiketleyin!')  

if(jail.match(/(\d{17,19})/g)) {
kullanıcı.roles.forEach(role => kullanıcı.removeRole(role));
kullanıcı.addRole(jail);
}
message.channel.send(`<@${kullanıcı.id}> adlı kullanıcıyı başarıyla hapise gönderdim.`)  
     
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};
exports.help = {
name: 'jail', 
description: 'Birinin bütün rollerini alıp cezalıya atmaya yarar.',  
usage: 'jail'  
};