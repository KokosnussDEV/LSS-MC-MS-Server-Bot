const Discord = require("discord.js");


module.exports = {
    createEmbed: (game, member, appName, version) => {
        let embed = new Discord.RichEmbed()
            .setTitle("A role was self-assiged to a Member")
            .setColor("RANDOM")
            .addField("Member", `${member}`)
            .addField("Role", `${game === "leitstellenspiel" ? "🇩🇪 leitstellenspiel.de" : `${game === "meldkamerspel" ? "🇳🇱 meldkamerspel.com" : "🇺🇸 missionchief.com"}`}`)
            .setFooter(`${appName} ${version}`)
            .setTimestamp();

        return embed;
    }
};