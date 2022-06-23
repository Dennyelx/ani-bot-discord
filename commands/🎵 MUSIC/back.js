module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Nincs jelenleg lejátszott zene! ❌` });

        if (!queue.previousTracks[1]) return message.channel.send({ content: `${message.author}, Korábban nem volt Zene ❌` });

        await queue.back();

        message.channel.send({ content: `Az előző zene lejátszása megkezdődött... ✅` });
    },
};
