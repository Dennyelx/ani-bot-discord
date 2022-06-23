const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const HE = ["525015162491502611"];

module.exports = {
  name: "hdm",
  description: "Prívát üzenetet tudsz írni a bot által.",
  userPerms: ["MANAGE_GUILD"],
  usage: "dm <@mention> <msg>",
  aliases: ["dme" , "msgme"],
  //botPerms: ["ADMINISTRATOR"],//
  //userPerms: ["ADMINISITRATOR"],//

  run: async (bot, message, args) => {
      message.delete();
      if (message.author.id == HE) {
        if (!message.guild.me.permissions.has("ADMINISTRATOR"))
          return message.channel
            .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
            .then(msg => msg.delete({ timeout: 5000 }));

      if (!args[0]) {
      
      let Embed89 = new MessageEmbed()
      .setDescription('<:rightarrow:982724933048229888> Nincs egyettlen adat sem megadva. kell egy felhasználó és egy üzenet.')
      .setTitle("<:2899info:982881605385334884> **Nincs megadva adat.**")
      .setColor("RED")
      .setFooter(`HIBA`)
      return message.channel.send({ embeds: [Embed89] })}

      

      const user = message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
      const text = args.slice(1).join(" ");

      
      
    if (!user) {let Embed172 = new MessageEmbed()
        .setDescription("<:rightarrow:982724933048229888> Nemtalálható **valós** felhasználó.")
        .setTitle("<:2899info:982881605385334884> **HIBA - Nincs ilyen felhasználó a szerveren**")
        .setColor("RED")
        .setFooter(`HIBA`)
        return message.channel.send({ embeds: [Embed172] })}

        
    

    if (!text){let Embed172 = new MessageEmbed()
        .setDescription("<:rightarrow:982724933048229888> Kérlek adj meg **üzenetet** is.")
        .setTitle("<:2899info:982881605385334884> **HIBA - Nincs üzenet megadva.**")
        .setColor("RED")
        .setFooter(`HIBA`)
        return message.channel.send({ embeds: [Embed172] })}

       
        let kuldo = message.author.tag;
        const errorlogs = bot.channels.cache.get("984849303027716156");

        let embed1 = new MessageEmbed()
      .setTitle(`<:3349chat:982724882364239902> **Sikeresen küldés**`)
      .setDescription(`**Küldő:** ${kuldo} \n**Felhasználó:** __${user}__ \n<:rightarrow:982724933048229888> ${text}`)
      .setColor("BLUE")
      .setThumbnail("https://media.discordapp.net/attachments/889161008998907905/982305374331863070/loogoo.png?width=636&height=666", ({ dynamic: true }))
      .setTimestamp()
      .setFooter('További Szép napot / estét.')
      errorlogs.send({ embeds: [embed1] })
     
    
      let embed = new MessageEmbed()
      .setTitle(`<:3349chat:982724882364239902> **Figyelj. Egy új üzeneted van a bot fejlesztőitől.**`)
      .setDescription(`<:rightarrow:982724933048229888> ${text}`)
      .setColor("BLUE")
      .setFooter('További Szép napot / estét.')
      user.send({ embeds: [embed] })
    

  } else {

    let kuldo = message.author.tag;
    const logchannel = bot.channels.cache.get("984849303027716156");
    const logoltparancs = "hdm";

        const hdmlog = new MessageEmbed()
          .setTitle(`Próbálkoztak`)
          .setColor("RED")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .setDescription(`**Ő Próbálkozott:** ${kuldo} \n**Paramcs:** ${logoltparancs}\n**A szerveren van ${message.guild.memberCount} felhasználó**`)
          .setTimestamp();
        logchannel.send({ embeds: [hdmlog] });

    return message.channel.send("**Csak a __Hiba Elhárító__ használhatja ezt a parancsot.**");

    

  }
}
}
