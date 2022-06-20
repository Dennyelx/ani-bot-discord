const discord = require("discord.js");

module.exports = {
  name: 'rmember',
  usage: "<@felhasználló> [indok]",
    descriptiom: "Egy adott felhasználót tudsz némítani a szerveren.",
  run: async (bot, message, args) => {
  
    const reportchannel = bot.channels.cache.get("985306342132690954");
    const report = args.join(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

      if (!user) {
        return message.channel.send(
          `<:2899info:982881605385334884> Kérlek jelölj meg valakit, és kérlek írd le a felhasználóval szenbeni panaszod.`
        );
      }

      message.channel.send(
        `${message.author}, A jelentést sikeresen elküldtük. Köszönjük hogy jelentettél egy felhasználót. <:accepted_correct:982724889087729674>`
      );
      const embed = new discord.MessageEmbed()
        .setTitle(`<:BadgeDiscordModerator:982724898512306186> Felhasználó jelentés`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .addField("Szerver Tulajdonos", `**${(await message.client.users.fetch(message.guild.ownerId)).tag}**`, true)
          .setDescription(`**A szerveren van ${message.guild.memberCount} felhasználó**`)
        .setDescription(`<:rightarrow:982724933048229888> **Jelentő:** ${message.author.tag} \n<:rightarrow:982724933048229888> **Jelentett:** ${user} \n<:rightarrow:982724933048229888> **Panasz: **${report}`)
        .setFooter(`Felhasználó ID: ${message.author.id}`)
        .setColor("RED");
  
      reportchannel.send({embeds: [embed]});
    },
    catch(error) {
      const errorlogs = bot.channels.cache.get("981576779506536479");
      message.channel.send(
        "Looks Like an Error has Ocurred. The Error has been reported to the Report Section!"
      );
      errorlogs.send("Error on Report Command \nError: \n" + error);

}
}