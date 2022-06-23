module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Jelenleg nincs zene lejátszva!. ❌` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `A jelenleg játszó zene neve **${queue.current.title}** szüneteltetve. ✅` : `${message.author}, Valami elromlott. ❌` });
    },
};
