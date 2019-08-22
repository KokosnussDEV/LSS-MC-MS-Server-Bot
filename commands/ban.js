const Discord = require("discord.js");

module.exports = {
    do: params => {
        const ONE_DAY_IN_MS = 86400000;
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
            .setDescription(`You can decide if banning ${banMember} is right or not.`)
            .addField("✅", "If yes, then react with the emoji above")
            .addField("❌", "If no, then react with the emoji above")
            .setFooter(`${params.appName} ${params.version}`)
            .setTimestamp();

        options.logChannel.send("<@&607914672770777121>!", {
            embed: banMsg
        }).then(async msg => {
            await msg.react("✅");
            msg.react("❌");

            setTimeout(() => {
                let filter = (reaction, user) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && getUserInTeam(user.id);
                console.log(user)
                let collector = msg.createReactionCollector(filter);

                collector.on("collect", r => {
                    let yes;
                    let no;

                    if (yes < 3 && no < 3) {
                        if (r.emoji.name === "✅") {
                            yes += 1;
                        } else {
                            no += 1;
                        }
                    } else {
                        if (yes >= 3) {
                            banMember.ban(reason);
                        } else {
                            msg.delete();
                            options.logChannel.send(`${banMember} was not banned!`);
                        }
                        collector.stop();
                    }
                })
            }, ONE_DAY_IN_MS);
        });

        let getUserInTeam = id => {
            let guild = options.message.guild;
            let reactUser = guild.fetchMember(id);

            if (!reactUser.roles.has(params.staffrole)) {
                return false;
            }
        }

    }
};