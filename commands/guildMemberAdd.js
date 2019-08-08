const Discord = require("discord.js");

module.exports = {
    do: params => {
        params.welcomeChannel.send(`Welcome to our United Discord ${params.member},
Please assign yourself your game-roles. Therefor use \`!d leitstellenspiel\` , \`!d missionchief\` and \`!d meldkamerspel\` to assign yourself a role. You can also assign yourself more than one role if you play multiple games.
Please also read <#608360580775936001> and <#608541041309515786>.
If you have any questions, feel free to ask!`);

        let welEmbed = new Discord.RichEmbed()
            .setTitle("A new member joined!")
            .setColor("RANDOM")
            .addField("Member", params.member.toString())
            .addField("New member count:", params.guild.memberCount)
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        params.logChannel.send({
            embed: welEmbed
        });
    }
};