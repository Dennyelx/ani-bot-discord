const discord = require("discord.js");

module.exports = {
    name: 'unban',
    run: async (bot, message, args) => {

  const permission = message.member.permissions.has("BAN_MEMBERS");
  const userId = args[0];
  const reason = args.slice(1).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod ehez a parancshoz. \nSzükséges jog: **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!userId) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat a kitíltás feloldásához. \nHelyes használat: **unban [felhasználó ID] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else {
    const totalBans = await message.guild.bans.fetch();
    const member = totalBans.find((x) => x.user.id === userId);

    if (!member) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("A felhasználó nincs a kitíltás listáján.");

      message.reply({
        embeds: [errEmbed3],
      });
    } else {
      message.guild.members
        .unban(userId, reason)
        .then(() => {
          const unbanEmbed = new discord.MessageEmbed()
            .setColor("0155b6")
            .setTitle(`Sikeres kitíltás feloldás. <:accepted_correct:982724889087729674>`)
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setDescription(
              `<:rightarrow:982724933048229888> **Kitíltott Felhasználó:** <@${userId}> \n<:rightarrow:982724933048229888> **Moderátor:** <@${message.author.id}> \n<:rightarrow:982724933048229888> **Indok:** **${reason}**`
            )
            .setTimestamp();

          message.reply({
            embeds: [unbanEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
          message.reply({
            content: "Valami hiba történt. Lehet hogy nagyobb rangja van mint az enyém. Vagy pedig az a rang az enyém felett van.",
          });
        });
    }
  }
}
}