module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Nincs jelenleg lejátszott zene! ❌` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, A jelenlegi után már nincs zene a sorban. ❌` });

        await queue.clear();

        message.channel.send({ content: `A sor most törlődött. 🗑️` });
    },
};
