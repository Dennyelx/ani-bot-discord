const Discord = require("discord.js");
const { MessageButton, MessageComponent, MessageActionRow } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Bot meghívás.",
  run: async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`<:loogoo:982724915616698408> Ani meghívás.`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("BLUE")
      .setDescription(
        `<:rightarrow:982724933048229888> **Ezzel a parancsal, vagy egyből az oldalon, vagy esetleg az Ani - Bot profiljában tudod egyből meghívni Ani-t.**`
      )
      .setFooter(`Ő kérte le: ${message.author.username}`);

    const row = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('💙 Ani Mehívás')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=822201066099179540&permissions=8&scope=bot")
      );

      const row1 = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('💻 Support Szerver')
          .setURL("https://discord.gg/gjvkuuMcHY")
      );

      const row2 = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('🖥 Weboldal')
          .setURL("http://discord.superbot.infora.hu")
      );

      message.channel.send({ embeds: [embed], components: [row, row1, row2] });

  },
};
