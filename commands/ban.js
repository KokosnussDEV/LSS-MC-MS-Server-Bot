const Discord = require("discord.js");

module.exports = {
        /*getUserInTeam: (id, message) => {
            let guild = message.guild;
            let reactUser = guild.fetchMember(id);

            return reactUser.roles.has(options.params.staffrole);
        },*/
        do: params => {
            getUserInTeam = (id, message, params) => {
                let guild = message.guild;
                let reactUser = guild.fetchMember(id);

                return reactUser.roles.has(params.staffrole);
            }
            // 86400000
            const ONE_DAY_IN_MS = 180000;


            if (!params.message.member.roles.has(params.staffrole)) {
                return require("./commandModules/nopermEmbed").do({
                    message: params.message,
                    logChannel: params.logChannel,
                    version: params.version,
                    appName: params.appName
                });
            }

            let banMember = params.message.mentions.members.first();
            if (!banMember) return params.message.channel.send(`You forgot to tag a member! Format: \`${params.prefix} ban @<user> reason\``);

            let reason = params.args.slice(2).join(' ');
            if (!reason) return params.message.channel.send(`You forgot the ban reason! Format: \`${params.prefix} ban @<user> reason\``);

            let banMsg = new Discord.RichEmbed()
                .setTitle('Title for ban embed')
                .setColor('RED')
                .setDescription(`You can decide if banning ${banMember} is right or not.`)
                .addField("✅", "If yes, then react with the emoji above")
                .addField("❌", "If no, then react with the emoji above")
                .setFooter(`${params.appName} ${params.version}`
                    "
                    .setTimestamp();

                    // <@&607914672770777121>!
                    params.logChannel.send("test", {
                        embed: banMsg
                    }).then(async msg => {
                        await msg.react('✅');
                        await msg.react('❌');

                        let filter = (reaction, user) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && getUserInTeam(user.id, params.message, params) && user.id != params.client.id;
                        let collector = msg.createReactionCollector(filter, {
                            time: ONE_DAY_IN_MS,
                            max: 7
                        });
                        let yes;
                        let no;

                        collector.on('collect', r => {
                            console.log(yes, no, r.emoji.name);
                            if (yes < 3 && no < 3) {
                                if (r.emoji.name === "✅") {
                                    yes += 1;
                                } else if (r.emoji.name === "❌") {
                                    no += 1;
                                }
                            } else {
                                if (yes >= 3) {
                                    collector.stop();
                                    // banMember.ban(reason);
                                    console.log(reason);
                                } else {
                                    collector.stop();
                                    msg.delete();
                                    params.logChannel.send(`${banMember} was not banned!`);
                                }
                            }
                        });
                    });
                }
        }