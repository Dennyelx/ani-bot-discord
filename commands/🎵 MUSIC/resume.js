module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`${message.author}, Jelenleg nincs zene lejátszva!. ❌` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `**${queue.current.title}**, A zene újra megy. ✅` : `${message.author}, Valami elromlott. ❌` });
    },
};
