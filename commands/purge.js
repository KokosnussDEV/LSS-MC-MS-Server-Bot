const Discord = require("discord.js");


module.exports = {
    do: async params => {
        let msgToDelete = params.args[2];

        if (!msgToDelete) return params.message.channel.send("Please give a number of messages to delete!");

        if (!params.message.member.roles.has(params.staffrole)) {
            require("./commandModules/nopermEmbed").do({
                message: params.message,
                logChannel: params.logChannel
            });
        }

        if (msgToDelete > 99) return params.message.channel.send("Too many messages to delete! (Range 1-99)");

        params.message.delete();

        let messages = await params.message.channel.fetchMessages({
            limit: msgToDelete
        });
        params.message.channel.bulkDelete(messages)

        let logMSG = new Discord.RichEmbed()
            .setTitle("I deleted some messages!")
            .setColor("RANDOM")
            .addField("Moderator", `${params.message.member}`)
            .addField("Number of Messages", `${messages.size}`)
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        params.message.channel.send({
            embed: logMSG
        });
    }
};