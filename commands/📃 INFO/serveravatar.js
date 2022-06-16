const Discord = require('discord.js');

module.exports = {
    name: "savatar",
    description: "Bot meghívás",
    botPerms: ["EMBED_LINKS"],
    run: async (bot, message, args) => {

        let avatar = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })


        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} Szerver képe.`)
        .setImage(avatar)
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor("BLUE")

        message.channel.send({ embeds: [embed] })

    }
}