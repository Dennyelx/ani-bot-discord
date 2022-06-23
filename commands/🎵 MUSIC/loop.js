const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Jelenleg nincs zene lejátszva!. ❌` });

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({ content: `${message.author}, Először le kell tiltania a meglévő zene loop  módját **(${bot.config.prefix}loop)** ❌` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mod: **${queue.repeatMode === 0 ? 'Kikapcsolva' : 'Aktív'}**, A teljes sorozat megismétli a non-stop-ot 🔁` : `${message.author}, Valami elromlott. ❌` });
        } else {
            if (queue.repeatMode === 2) return message.channel.send({ content: `${message.author}, Loop módban először le kell tiltania a meglévő várólistát **(${bot.config.prefix}loop queue)** ❌` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mod: **${queue.repeatMode === 0 ? 'Kikapcsolva' : 'Aktív'}**, Az aktuális zene megállás nélkül megismétlődik a listában szereplő összes zene **${bot.config.prefix}loop queue**  megismételheti az opcióval.) 🔂` : `${message.author}, Valami elromlott ❌` });
};
    },
};
