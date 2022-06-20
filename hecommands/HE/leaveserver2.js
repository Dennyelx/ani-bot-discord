const Discord = require("discord.js");
const HE = ["525015162491502611"];

module.exports = {
    name: "hls",
    category: "info",
    usage: "serverinfo",
    description: "Ezzel a parancsal kitudod léptetni a botot az adott szerverről.",
    run: async (bot, message, args) => {

      if (message.author.id == HE) {
        if (!message.guild.me.permissions.has("ADMINISTRATOR"))
          return message.channel
            .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
            .then(msg => msg.delete({ timeout: 5000 }));
              
                  const guildId = args[0];
       
          if (!guildId) {
            return message.channel.send("<:x_:892448949925969990> Kérlek adj meg egy szerver id-t.");
          }
       
          const guild = bot.guilds.cache.find((g) => g.id === guildId);
       
          if (!guild) {
            return message.channel.send("<:x_:892448949925969990> Nem találom a szervert.");
          }
       
          try {
            await guild.leave();
            message.channel.send(`<:pipa:892448949967917096> Sikeresen kiléptem a következő szerver-ről: **${guild.name}**`);
          } catch (e) {
            console.error(e);
            return message.channel.send("<:x_:892448949925969990> Nem tudok kilépni a szerver-ről.");
          }
          } else {

            let kuldo = message.author.tag;
    const logchannel = bot.channels.cache.get("984849303027716156");
    const logoltparancs = "hls";

        const hlslog = new MessageEmbed()
          .setTitle(`Próbálkoztak`)
          .setColor("RED")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .setDescription(`**Ő Próbálkozott:** ${kuldo} \n**Paramcs:** ${logoltparancs}\n**A szerveren van ${message.guild.memberCount} felhasználó**`)
          .setTimestamp();
        logchannel.send({ embeds: [hlslog] });

            return message.channel.send("**Csak a __Hiba Elhárító__ használhatja ezt a parancsot.**");
    
    }
}
}
