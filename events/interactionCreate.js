const Discord = require('discord.js');
module.exports = (bot, int) => {
    if (!int.isButton()) return;

    const queue = bot.player.getQueue(int.guildId);
    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });

          const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle(bot.user.username + " - Save Track")
          .setThumbnail(bot.user.displayAvatarURL())
          .addField(`Track`, `\`${queue.current.title}\``)
          .addField(`Duration`, `\`${queue.current.duration}\``)
          .addField(`URL`, `${queue.current.url}`)
          .addField(`Saved Server`, `\`${int.guild.name}\``)
          .addField(`Requested By`, `${queue.current.requestedBy}`)
          .setTimestamp()
          .setFooter({ text: 'Ani ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
          int.member.send({ embeds: [embed] }).then(() => {
                return int.reply({ content: `I sent you the name of the music in a private message ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `I can't send you a private message. ❌`, ephemeral: true, components: [] });
            });
        }
        break
        case 'time': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();
    
            if (timestamp.progress == 'Infinity') return int.message.edit({ content: `This song is live streaming, no duration data to display. 🎧` });
    
            const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(queue.current.title)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`${progress} (**${timestamp.progress}**%)`)
            .setFooter({ text: 'jmes ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
            int.message.edit({ embeds: [embed] });
            int.reply({ content: `**✅ Success:** Time data updated. `, ephemeral: true});
        }
    }
};
