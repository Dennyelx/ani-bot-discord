module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Jelenleg nincs zene lejátszva!. ❌` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `**${queue.current.title}**, Következő zenére léptetve. ✅` : `${message.author}, Valami elromlott. ❌` });
    },
};
