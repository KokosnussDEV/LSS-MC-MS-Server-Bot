const Discord = require("discord.js");

module.exports = {
    do: params => {
        let options = {
            message: params.message,
            args: params.args
        };

        if (!params.message.member.roles.has(params.staffrole)) {
            require("./commandModules/nopermEmbed").do({
                message: options.message,
                logChannel: params.logChannel,
                version: params.version,
                appName: params.appName
            });
        }

        let banMember = options.message.mentions.members.first();
        if (!banMember) return options.message.channel.send(`You forgot to tag a member! Format: \`${params.prefix} ban @<user> reason\``);

        let reason = options.args.slice(2).join(" ");
        if (!reason) return options.message.channel.send(`You forgot the ban reason! Format: \`${params.prefix} ban @<user> reason\``);

        let banMsg = new Discord.RichEmbed()
            .setTitle("Title for ban embed")
            .setColor("RED")
            .setDescription("You can decide if banning this member is right or not.")
            .addField("", "If yes, then react with the emoji above")
            .addField("", "If no, then react with the emoji above")
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

    }
};