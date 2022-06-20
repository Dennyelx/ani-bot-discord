const discord = require("discord.js");
const HE = ["653257694689493022"];

module.exports = {
    name: 'old',
    usage: "",
    descriptiom: "Adminisztrátorság szolgálatból kilépés.",
    run: async (bot, message, args) => {

      if (message.author.id == HE) {
        if (!message.guild.me.permissions.has("ADMINISTRATOR"))
          return message.channel
            .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
            .then(msg => msg.delete({ timeout: 5000 }));

  let userr =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;


        const joind = new discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`<:Support:982724937066369125> ${userr} Kilépett az adminisztrátor szolgálatból. <:CircleTicketNo:982724901184086056>`)
          .setTimestamp();

        message.channel.send({
          embeds: [joind],
        })

        let kuldo = message.author.tag;
        const logchannel = bot.channels.cache.get("984849303027716156");
    
        const jolog = new discord.MessageEmbed()
        .setTitle(`<:Support:982724937066369125> Szolgálatba lépett.`)
        .setColor("GREEN")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Szerver Neve", `**${message.guild.name}**`, true)
        .addField("Szerver ID", `**${message.guild.id}**`, true)
        .setDescription(`**Ő lépett szolgálatba:** ${kuldo}`)
        .setTimestamp();
      logchannel.send({ embeds: [jolog] });

      }else {
    
        return message.channel.send("**Csak a __Tulajdonos__ használhatja ezt a parancsot.**");
    
        
    
      }


     
}
}