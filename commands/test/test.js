module.exports = {
    name: 'friday-the-13th',
    aliases: ['friday-13th', 'friday-13', 'friday-the-13', 'friday-the-thirteenth', 'friday-thirteenth'],
    description: 'Determines if today is Friday the 13th.',
    ownerOnly: false,
    cooldown: 0,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES'],
    category: 'Events',
    usage: '',
    run: async (bot, message, args) => {
            const today = new Date();
		    const isFridaythe13th = today.getDay() === 5 && today.getDate() === 13;
            return message.reply(`Today **is${isFridaythe13th ? '' : ' not'}** Friday the 13th.`);
    }
}