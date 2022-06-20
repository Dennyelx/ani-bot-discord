
const { MessageButton, MessageComponent, MessageActionRow } = require("discord.js")

module.exports = {
    name: 'b',
    run: async (bot, message, args) => {

        const row = new MessageActionRow()
        .addComponents(
        new MessageButton()
            .setStyle('LINK')
            .setLabel('CLICK THIS')
            .setURL("https://google.com")
        );

        message.channel.send({ content: `asd`, components: [row]});

    }
}