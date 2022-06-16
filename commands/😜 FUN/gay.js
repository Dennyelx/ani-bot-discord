const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'buzivagyok',
  description: 'test',
  run: async (bot, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mentionedMember) mentionedMember = message.member

    const embed = new MessageEmbed()
    .setTitle(`<:kep:892887909521326161> Ő` + mentionedMember.user.tag + " egy kis buzi.")
    .setDescription("Itt van egy kis ajándék.")
    .setImage("https://tse3.mm.bing.net/th?id=OIP.gtCHYVWoIrf50UkCIcyazAHaL_&pid=15.1",({ dynamic: true, size: 2048 }))
    .setColor('BLUE')
    .setTimestamp()

    message.channel.send({ embeds: [embed]})
  }
}