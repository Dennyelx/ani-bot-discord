const {
  MessageEmbed,
  Message,
  MessageButton, 
  MessageComponent, 
  MessageActionRow,
  bot
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const prefix = require("../../botconfig.json").prefix; // this one gets the prefix
const botname = require("../../botconfig.json").botname;
let color = "#ff0000"; // this is the color of the embed
const HE = ["525015162491502611"];

const create_mh = require(`../../functions/menu.js`); // this one gets the dropdown menu

module.exports = {
  name: "hcmd",
  emoji: `📌`, // emoji next to the command name i will show you in a min
  description: "Megmutatja az összes parancsot.",
  /**
   * 
   * @param {bot} bot 
   * @param {Message} message 
   * @param {String} args 
   * @returns 
   */
  run: async (bot, message, args, Discord, db) => {
    if (message.author.id == HE) {
      if (!message.guild.me.permissions.has("ADMINISTRATOR"))
        return message.channel
          .send("Nincs meg ez a jogom: `ADMINISTRATOR`")
          .then(msg => msg.delete({ timeout: 5000 }));

      let categories = [];
      let cots = [];

      if (!args[0]) {

          //categories to ignore
          let ignored = [
              "test"
          ];

          const emo = {

              games: "🎮",            
              miscellaneous: "🎫",
              image: "📸",
              owner: "📝",
              info: "❓",
              moderator: "⚒️",
              economy: "💰"
// emojis for the categories
          }

          let ccate = [];
          //gets all the folders and commands
          readdirSync("./hecommands/").forEach((dir) => {
              if (ignored.includes(dir.toLowerCase())) return;
              const commands = readdirSync(`./hecommands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
              );

              if (ignored.includes(dir.toLowerCase())) return;

              const name = `${dir}`;
              //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
              let nome = dir.toUpperCase();

              let cats = new Object();

              //this is how it will be created as
              cats = {
                  name: name,
                  value: `-`,
                  inline: true
              }


              categories.push(cats);
              ccate.push(nome);
          });
          //embed
          const embed = new MessageEmbed()
              .setTitle(`<:loogoo:982724915616698408> ${botname} Parancsok.`)
              .setThumbnail(bot.user.displayAvatarURL())
              .setDescription(`>>> **A prefixem:** \`${prefix}\` \n**Fejlesztések:** \n**<:BadgeDiscordEmployee:980361494069911583> - v12 updated to v13**`)
              .addFields(categories)
              .setImage("https://cdn.discordapp.com/attachments/889161008998907905/982301542419931216/anibanner.png")
              .setFooter(
                  `Ő kérte le: ${message.author.tag}`,
                  message.author.displayAvatarURL({
                      dynamic: true
                  })
              )
              .setTimestamp()
              .setColor("BLUE")


//creating the dropdown menu
          let menus = create_mh(ccate);
          return message.reply({
              embeds: [embed],
              components: menus.smenu
          }).then((msgg) => {

              const menuID = menus.sid;

              const select = async (interaction) => {
                  if (interaction.customId != menuID) return;

                  let {
                      values
                  } = interaction;

                  let value = values[0];

                  let catts = [];

                  readdirSync("./hecommands/").forEach((dir) => {
                      if (dir.toLowerCase() !== value.toLowerCase()) return;
                      const commands = readdirSync(`./hecommands/${dir}/`).filter((file) =>
                          file.endsWith(".js")
                      );


                      const cmds = commands.map((command) => {
                          let file = require(`../../hecommands/${dir}/${command}`); //getting the commands again

                          if (!file.name) return "Nincs parancs";

                          let name = file.name.replace(".js", "");

                          if (bot.commands.get(name).hidden) return;


                          let des = bot.commands.get(name).description;
                          let emo = bot.commands.get(name).emoji;
                          let emoe = emo ? `${emo} - ` : ``;

                          let obj = {
                              cname: `${emoe}\`${name}\``,
                              des
                          }

                          return obj;
                      });

                      let dota = new Object();

                      cmds.map(co => {
                          if (co == undefined) return;

                          dota = {
                              name: `Parancs: ${cmds.length === 0 ? "In progress." : co.cname}`,
                              value: co.des ? co.des : `*Nincs leírás.*`,
                              inline: true,
                          }
                          catts.push(dota)
                      });

                      cots.push(dir.toLowerCase());
                  });

                  if (cots.includes(value.toLowerCase())) {
                      const combed = new MessageEmbed()
                          .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Parancsok!__`)
                          .setThumbnail(bot.user.displayAvatarURL())
                          .setDescription(`>>> Használd a  \`${prefix}help\` <parancs neve>, parancsot. Ha több információ érdekel.\n\n`)
                          .addFields(catts)
                          .setColor("BLUE")
                          .setImage("https://cdn.discordapp.com/attachments/889161008998907905/982301542419931216/anibanner.png")

                      await interaction.deferUpdate();

                      return interaction.message.edit({
                          embeds: [combed],
                          components: menus.smenu
                      })
                  };

              };

              const filter = (interaction) => {
                  return !interaction.user.bot && interaction.user.id == message.author.id
              };

              const collector = msgg.createMessageComponentCollector({
                  filter,
                  componentType: "SELECT_MENU"
              });
              collector.on("collect", select);
              collector.on("end", () => null);

          });

      } else {
          let catts = [];

          readdirSync("./hecommands/").forEach((dir) => {
              if (dir.toLowerCase() !== args[0].toLowerCase()) return;
              const commands = readdirSync(`./hecommands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
              );


              const cmds = commands.map((command) => {
                  let file = require(`../../hecommands/${dir}/${command}`);

                  if (!file.name) return "Nincs parancs.";

                  let name = file.name.replace(".js", "");

                  if (client.commands.get(name).hidden) return;


                  let des = client.commands.get(name).description;
                  let emo = client.commands.get(name).emoji;
                  let emoe = emo ? `${emo} - ` : ``;

                  let obj = {
                      cname: `${emoe}\`${name}\``,
                      des
                  }

                  return obj;
              });

              let dota = new Object();

              cmds.map(co => {
                  if (co == undefined) return;

                  dota = {
                      name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                      value: co.des ? co.des : `Nincs leírás.`,
                      inline: true,
                  }
                  catts.push(dota)
              });

              cots.push(dir.toLowerCase());
          });

          const command =
              bot.commands.get(args[0].toLowerCase()) ||
              bot.commands.find(
                  (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
              );

          if (cots.includes(args[0].toLowerCase())) {
              const combed = new MessageEmbed()
                  .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                  .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                  .addFields(catts)
                  .setColor("YELLOW")
                  .setImage("https://cdn.discordapp.com/attachments/889161008998907905/982301542419931216/anibanner.png")

              return message.reply({
                  embeds: [combed]
              })
          };

          if (!command) {
              const embed = new MessageEmbed()
                  .setTitle(`Helytelen parancs! Használat: \`${prefix}help\` és megmutatja az összes parancsot!`)
                  .setColor("BLUE");
              return await message.reply({
                  embeds: [embed],
                  allowedMentions: {
                      repliedUser: false
                  },
              });
          }

          const embed = new MessageEmbed() //this is for commmand help eg. !!help ping
              .setTitle("Parancs leírása")
              .setThumbnail(bot.user.displayAvatarURL())
              .addField(
                  "Parancs:",
                  command.name ? `\`${command.name}\`` : "Nincs parancs."
              )
              .addField(
                  "Használat:",
                  command.usage ?
                  `\`${prefix}${command.name} ${command.usage}\`` :
                  `\`${prefix}${command.name}\``
              )
              .addField(
                  "Parancs leírás:",
                  command.description ?
                  command.description :
                  "Nincs leírás."
              )
              .setFooter(
                  `Ő kérte le: ${message.author.tag}`,
                  message.author.displayAvatarURL({
                      dynamic: true
                  })
              )
              .setTimestamp()
              .setColor("BLUE");
          return await message.reply({
              embeds: [embed]
          });
      }
  }else {

    let kuldo = message.author.tag;
    const logchannel = bot.channels.cache.get("984849303027716156");
    const logoltparancs = "hcmd";

        const hcmdlog = new MessageEmbed()
          .setTitle(`Próbálkoztak`)
          .setColor("RED")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .setDescription(`**Ő Próbálkozott:** ${kuldo} \n**Paramcs:** ${logoltparancs}\n**A szerveren van ${message.guild.memberCount} felhasználó**`)
          .setTimestamp();
        logchannel.send({ embeds: [hcmdlog] });

    return message.channel.send("**Csak a __Hiba Elhárító__ használhatja ezt a parancsot.**");
  }
}
}