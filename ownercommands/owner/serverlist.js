const Discord = require("discord.js");
require("dotenv").config();
const ownerid = "653257694689493022";

module.exports = {
    name: "sl",
    description: "Szerver lista.",

    run: async (bot, message, args, guildDB) => {
    if (message.author.id == ownerid) {
      if (!message.guild.me.permissions.has("ADMINISTRATOR"))
        return message.channel
          .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
          .then(msg => msg.delete({ timeout: 5000 }));

      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `**Az összes szerver ahol a** __${bot.user.username}__ **bent van -** \`${bot.guilds.cache.size}\`\n\n` +
        bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** • **${r.name}** ‖ **${r.memberCount} Ember**\n**ID** - \`${r.id}\``)
          .slice(0, 10)
          .join("\n\n");

      let embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL({dynamic : true}))
        
        .setColor("00FFFF")
        .setFooter(`OLDAL - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send({embeds:[embed]});

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {

          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

    
          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

       
          embed
            .setFooter(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

    
          msg.edit(embed);
        }

        if (reaction._emoji.name === "➡") {
      
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

         
          if (i1 > bot.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          embed
            .setFooter(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

        
          msg.edit(embed);
        }

        if (reaction._emoji.name === "❌") {
          const xembed = new Discord.MessageEmbed()
          .setTitle(`Törölve`)
          .setDescription(`A panel törölve lett mert valaki ráment erre az emojira: :x:`)
          .setColor("RED");
          msg.delete()
          message.channel.send({embeds:[xembed]});
        }

        
      });
    } else {
      return message.channel.send("Csak a __Tulajdonos__ használhatja ezt a parancsot.");
    }
  }
};