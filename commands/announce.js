module.exports = {
    do: async params => {
        let channel = params.message.channel;
        params.message.delete();

        let filterQ1 = m => (m.content.toLowerCase() == "yes" || m.content.toLowerCase() == "no") && m.author === params.message.author,
            filterQ2 = m => m.author === params.message.author,
            filterQ3 = m => m.author === params.message.author && m.mentions.channels,
            filterQ4 = m => m.author === params.message.author,
            options = {
                max: 1,
                time: 30000
            },
            txt,
            everyone,
            textToSend,
            channel2Send;


        let question1 = await channel.send("With tagging everyone?"),
            question1Answer = await channel.createMessageCollector(filterQ1, options);

        question1Answer.on("collected", async m => {
            everyone = m.content.toLowerCase() == "yes";

            await question1.delete();
        });

        question1Answer.on("end", async () => {
            let question2 = await channel.send("Now, please send me your content!"),
                question2Answer = await channel.createMessageCollector(filterQ2, options);

            question2Answer.on("collected", async m => {
                txt = m.content;

                textToSend = `<a:lss_global_ani:609011670026682388> **Announcement** ${everyone ? "(@everyone)" : ""} <a:lss_global_ani:609011670026682388><a:weewoo:608542184169275392>
${txt}`;

                await question2.delete();
            });

            question2Answer.on("end", async () => {
                let question3 = await channel.send("Now please to the channel in which I should send the message!"),
                    question3Answer = await channel.createMessageCollector(filterQ3, options);

                question3Answer.on("collect", async m => {
                    channel2Send = m.mentions.channels.first();

                    await question3.delete();
                });

                //const textToSend = `<a:lss_global_ani:609011670026682388> **Announcement** ${everyone ? "(@everyone)" : ""} <a:lss_global_ani:609011670026682388><a:weewoo:608542184169275392>
                //${txt}`;

                question3Answer.on("end", async () => {
                    let previewMSG = await channel.send(`Here is a quick preview of what I will send in ${channel2Send} with ${everyone ? "" : "no"} everyone tag!`);
                    let preview = channel.send(textToSend).then(msg => {
                        setTimeout(() => {
                            previewMSG.delete();
                            preview.delete();
                            channel2Send.send(textToSend);
                        }, 20000);
                    });
                });
            });
        });
    }
};