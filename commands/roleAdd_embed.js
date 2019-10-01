const Discord = require("discord.js");

module.exports = {
    do: async params => {
        let deRole = params.message.guild.roles.find(r => r.id === params.deRole),
            nlRole = params.message.guild.roles.find(r => r.id === params.nlRole),
            usRole = params.message.guild.roles.find(r => r.id === params.usRole),
            ukRole = params.message.guild.roles.find(r => r.id === params.ukRole)

        let roleAddEmbed = new Discord.RichEmbed()
            .setTitle("Game Roles")
            .setColor("RANDOM")
            .setDescription(`Under this Message you can react with the Nation Flag of your Game!`)
            .addField("🇩🇪", "leitstellenspiel.de")
            .addField("🇳🇱", "meldkamerspel.com")
            .addField("🇺🇸", "missionchief.com")
            .addField("🇬🇧", "missionchief.co.uk")
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        params.message.delete();
        let msg = await params.message.channel.send({
            embed: roleAddEmbed
        });

        let reactFilter = (reaction, user) => {
            return (reaction.emoji.name === "🇩🇪" || reaction.emoji.name === "🇳🇱" || reaction.emoji.name === "🇺🇸" || reaction.emoji.name === "🇬🇧") && user.id === params.message.author.id;
        };

        let reactOpt = {
            max: 1,
            time: 30000
        };

        await msg.react("🇩🇪");
        await msg.react("🇳🇱");
        await msg.react("🇺🇸");
        await msg.react("🇬🇧");

        let reactionCollector = msg.createReactionCollector(reactFilter, reactOpt);

        reactionCollector.on("collect", reaction => {
            if (reaction.emoji.name === "🇩🇪") {
                params.message.member.addRole(deRole);
                let logDE = await log("de", params.message.member, params);
                params.logChannel.send({
                    embed: logDE
                });
            } else if (reaction.emoji.name === "🇳🇱") {
                params.message.member.addRole(nlRole);
                let logNL = await log("nl", params.message.member, params);
                params.logChannel.send({
                    embed: logNL
                });
            } else if (reaction.emoji.name === "🇺🇸") {
                params.message.member.addRole(usRole);
                let logUS = await log("us", params.message.member, params);
                params.logChannel.send({
                    embed: logUS
                });
            } else if {
                params.message.member.addRole(ukRole);
                let logUK = await log("uk", params.message.member, params);
                params.logChannel.send({
                    embed: logUK
                });
            } else {
                params.message.channel.send("A funny bunny error occured! Please Contact the Team!");
            }
        });

        reactionCollector.on("end", () => {
            msg.delete()
        });
    }
}

let log = (lang, member, params) => {
    let logEmbed = new Discord.RichEmbed()
        .setTitle("A role was self-assiged to a Member")
        .addField("Member", `${member}`)
        .addField("Role", `${lang === "de" ? "🇩🇪 leitstellenspiel.de" : `${lang === "nl" ? "🇳🇱 meldkamerspel.com" : `${lang === "us" ? "🇺🇸 missionchief.com" : "🇬🇧 missionchief.co.uk"}`}`}`)
        .setFooter(`${params.appName} ${params.version}`)
        .setTimestamp();

    return logEmbed;
}