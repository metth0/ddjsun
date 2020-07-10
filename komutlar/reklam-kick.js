const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send('**Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!**')
  
    if (!args[0]) return message.channel.send(' **Sistemi kullanabilmek için** -reklamkick aç veya kapat`')

    if (args[0] == 'aç') {
        db.set(`reklamkick_${message.guild.id}`, 'acik')
          message.channel.send(`Reklam kick sistemi açıldı. Reklam yapanlar 3 uyarıdan sonra Kicklenecektir`)

    }
    if (args[0] == 'kapat') {
        db.set(`reklamkick_${message.guild.id}`, 'kapali')
        message.channel.send(`Reklam kick sistemi kapatıldı`)

    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reklam-kick'],
    permLevel: 0
};

exports.help = {
    name: 'reklamkick',
    description: 'Reklam kick sistemini açıp kapatır',
    usage: 'reklamkick aç/kapat'
};