const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();

  if (reason.length < 1) return message.reply('**Sunucudan Atma Sebebini Yazmalısın**');
  if (message.mentions.users.size < 1) return message.reply('**Kimi Sunucudan Atacağını Yazmalısın**').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('**Yetkilileri Sunucudan Atamam**');
  message.guild.member(user).kick();

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};
