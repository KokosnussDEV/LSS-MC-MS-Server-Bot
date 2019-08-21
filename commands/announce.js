module.exports = {
    do: async params => {
        let channel = params.message.channel;
        params.message.delete();

        let filterQ1 = m => m.content.toLowerCase() == "yes" || m.content.toLowerCase() == "no" && m.author === params.message.author,
            filterQ2 = m => m.author === params.message.author,
            filterQ3 = m => m.author === params.message.author && m.mentions.channels,
            filterQ4 = m => m.author === params.message.author,
            options = {
                max: 1,
                time: 30000
            },
            everyone,
            txt,
            channel2Send;


        let question1 = await channel.send("With tagging everyone?"),
            question1Answer = await channel.createMessageCollector(filterQ1, options);

        question1Answer.on("collected", async m => {
            everyone = m.content == "yes" ? true : false;

            await question1.delete();
        });

        question1Answer.on("end", async () => {
            let question2 = await channel.send("Now, please send me your content!"),
                question2Answer = await channel.createMessageCollector(filterQ2, options);

            question2Answer.on("collected", async m => {
                console.log(m.toString());
                txt = m.content.toString();

                console.log(txt);

                await question2.delete();
            });

            question2Answer.on("end", async () => {
                let question3 = await channel.send("Now please to the channel in which I should send the message!"),
                    question3Answer = await channel.createMessageCollector(filterQ3, options);

                question3Answer.on("collect", async m => {
                    channel2Send = m.mentions.channels.first();

                    await question3.delete();
                });

                let textToSend = `<a:lss_global_ani:609011670026682388> **Announcement** ${everyone ? "(@everyone)" : ""} <a:lss_global_ani:609011670026682388><a:weewoo:608542184169275392>
${txt}`;

                question3Answer.on("end", async () => {
                    let question4 = await channel.send("here is a quick preview of what I will send. Cancel with `cancel` proceed with `proceed`."),
                        question4Answer = await channel.createMessageCollector(filterQ4, options);

                    question4Answer.on("collect", async m => {
                        if (!m.content === "proceed") {
                            question4.delete();
                            return;
                        }
                    });

                    question4Answer.on("end", async () => {
                        channel.send(`I will send the following message in ${channel2Send} with ${everyone ? "" : "no"} everyone tag`)
                            .then(msg => {
                                channel.send(textToSend)
                                    .then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                            channel2Send.send(textToSend);
                                        }, 19999);
                                    });
                                setTimeout(() => {
                                    msg.delete();
                                }, 1);
                            });

                    });
                });
            });
        });
    }
};
