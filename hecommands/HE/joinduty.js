const discord = require("discord.js");
const HE = ["525015162491502611"];
module.exports = {
    name: 'hjd',
    usage: "",
    descriptiom: "Adminisztrátorság szolgálatba lépsz.",
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
          .setColor("GREEN")
          .setDescription(`<:Support:982724937066369125> ${userr} Adminisztrátor szolgálatba lépett. <:accepted_correct:982724889087729674>`)
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
    
        return message.channel.send("**Csak a __Hiba Elhárító__ használhatja ezt a parancsot.**");
    
        
    
      }


     
}
}