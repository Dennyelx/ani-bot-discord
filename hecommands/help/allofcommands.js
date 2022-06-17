const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../botconfig.json").prefix;
const HE = ["525015162491502611"];

module.exports = {
  name: "hcmd",
  category: "Fun",
  description: "Ezzel a parancsal tudod megnézni az összes commandot, és lekérni a parancs informácioit.",
  
  run: async (bot, message, args) => {
    if (message.author.id == HE) {
      if (!message.guild.me.permissions.has("ADMINISTRATOR"))
        return message.channel
          .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
          .then(msg => msg.delete({ timeout: 5000 }));

    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./ownercommands/").forEach((dir) => {
        const commands = readdirSync(`./ownercommands/${dir}/`,).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../ownercommands/${dir}/${command}`);

          if (!file.name) return "Nincs parancs név.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" | "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setTitle("<:SuperBot:889161135117434950> Kell segítség? Itt vannak a parancsaim:")
        .addFields(categories)
        .setDescription(
          `Ha bővebb információt akarsz megtudni egy parancsról akkor használd: \n**${prefix}help <parancs neve>**`
        )
        .setImage("https://media.discordapp.net/attachments/889161008998907905/933847437821501440/SuperHUB.png?width=960&height=320")
        .setFooter(
          ` A segítséget kérte: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("YELLOW");
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        bot.commands.get(args[0].toLowerCase()) ||
        bot.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`<:x_:892448949925969990> Helytelen használat! Használd: \`${prefix}help\` az összes parancsomhoz!`)
          .setColor("YELLOW");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setTitle("<:info:892887909559066677> Parancs részletek:")
        .addField("Prefix:", `\`${prefix}\``)
        .addField(
          "Parancs:",
          command.name ? `\`${command.name}\`` : "Nincs neve ennek a parancsnak."
        )
        .addField(
          "Hasznlálat:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Leírás:",
          command.description
            ? command.description
            : "Nincs leírása ennek a parancsnak."
        )
        .setFooter(
          `Ő kérte le: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    }
  }else {
    return message.channel.send("**Csak a __Hiba Elhárító__ használhatja ezt a parancsot.**");
  }
}
};
