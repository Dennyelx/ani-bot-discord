const Discord = require("discord.js");
const ownerid = ["653257694689493022"];

module.exports = {
    name: "getinv",
    category: "info",
    usage: "getinv",
    description: "Ezzel a parancsal tudsz szerver invite-ot lekérni.",
    run: async (bot, message, args) => {
    
      if (message.author.id == ownerid) {
        let guild = null;

        if (!args[0]) return message.channel.send("<:x_:892448949925969990> Kérlek add meg a szerver nevét vagy ID-jét.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("<:x_:892448949925969990> Nem jó szerver nevet vagy ID-t adtál meg.");
        }
        if(guild){
            if (guild) {
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("<:x_:892448949925969990> Valami hiba történt, kérlek próbáld meg újra."); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - A bot nincs a szerveren.`);
        }
    } else {
        return;
    }
    
        }
    }
}