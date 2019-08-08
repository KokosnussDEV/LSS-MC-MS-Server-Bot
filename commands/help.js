const Discord = require("discord.js");

module.exports = {
    do: function (params) {
        let helpEmbed = new Discord.RichEmbed()
            .setTitle("Help!!")
            .setColor(0x005542)
            .addField("All commands:", `\`\`\`${params.adminPrefix} (un-)mute, ${params.adminPrefix} tempmute, ${params.adminPrefix} kick, ${params.adminPrefix} ban (WIP), ${params.adminPrefix} warn, ${params.prefix}ticket <new/add/topic/close>\`\`\``)
            .addBlankField()
            .addField(`${params.adminPrefix} mute`, `\`${params.adminPrefix} (un-)mute @<user>\``)
            .addField(`${params.adminPrefix} tempmute`, `\`${params.adminPrefix} tempmute @<user> <Time (s/m/h/d)> <Reason>\``)
            .addField(`${params.adminPrefix} kick`, `\`${params.adminPrefix} kick @<user> <Reason>\``)
            .addField(`${params.adminPrefix} ban (WIP)`, `\`${params.adminPrefix} ban @<user> <Reason>\``)
            .addField(`${params.adminPrefix} warn`, `\`${params.adminPrefix} warn @<user> <Reason>\``)
            .addField("Ticket Section New", `\`${params.prefix}ticket new <Ticket-Reason>\``)
            .addField("Ticket Section Add", `\`${params.prefix}ticket add @<user>\``)
            .addField("Ticket Section Topic", `\`${params.prefix}ticket topic <new Ticket-Reason>\``)
            .addField("Ticket Section Close", `\`${params.prefix}ticket close <Reason>\``)
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        params.message.channel.send({
            embed: helpEmbed
        });
    }
};