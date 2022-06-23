const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, There is no music currently playing!. ❌` });

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['Kikapcsolva', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Hangerő **%${queue.volume}**\nIdő **${trackDuration}**\nURL: ${track.url}\nLoop Mod: **${methods[queue.repeatMode]}**\n${track. requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({ text: 'jmes ❤️', iconURL: message.author.avatarURL({ dynamic: true }) });

        const saveButton = new MessageButton();

        saveButton.setLabel('Zene mentése');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
