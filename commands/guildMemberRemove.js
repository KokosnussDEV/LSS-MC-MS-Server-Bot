const Discord = require("discord.js");

module.exports = {
    do: function (params) {

        let leaveEmbed = new Discord.RichEmbed()
            .setTitle("Someone left us...")
            .setColor(0xea7362)
            .addField("Member", params.member.toString())
            .addField("New member count:", params.guild.memberCount)
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        params.logChannel.send({
            embed: leaveEmbed
        });
    }
}