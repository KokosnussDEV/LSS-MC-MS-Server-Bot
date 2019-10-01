// Discord Client erstellen
const Discord = require("discord.js");
const client = new Discord.Client({
    fetchAllMembers: true
});

const dotenv = require("dotenv");
dotenv.config();

// Erster LOG Channel schritt
let logChannel;
let welcomeChannel;
let guild;

let appName = process.env.APP_NAME,
    version = process.env.DEV_VERSION,
    logChannelID = process.env.LOG_CHANNEL_ID,
    prefix = process.env.PREFIX,
    ownerID = process.env.OWNER_ID,
    staffrole = process.env.STAFF_ROLE_ID,
    muterole = process.env.MUTE_ROLE_ID,
    deRole = process.env.DE_ROLE_ID,
    nlRole = process.env.NL_ROLE_ID,
    usRole = process.env.US_ROLE_ID,
    ukRole = process.env.UK_ROLE_ID,
    adminPrefix = process.env.ADMIN_PREFIX,
    welcomeChannelID = process.env.WELCOME_CHANNEL_ID,
    guildID = process.env.GUILD_ID;


client.on("ready", () => {

    // LOG Channel holen (2. LOG Channel Schritt)
    logChannel = client.channels.get(logChannelID);
    welcomeChannel = client.channels.get(welcomeChannelID);
    guild = client.guilds.get(guildID);
    // Client Username anzeigen
    console.log(`Verbunden als ${client.user.tag}`);

    // Client Server ausgeben
    console.log("Verbunden zu: ");
    client.guilds.forEach(guild => {
        console.log(` - ${guild.name}`);
    });

    // Activity auf "Schaut auf Nachrichten" setzen
    client.user.setActivity("messages.", {
        type: "WATCHING"
    });
});

client.on("guildMemberAdd", member => {
    require("./commands/guildMemberAdd").do({
        member: member,
        logChannel: logChannel,
        welcomeChannel: welcomeChannel,
        guild: guild,
        version: version,
        appName: appName
    });
});

client.on("guildMemberRemove", member => {
    require("./commands/guildMemberRemove").do({
        member: member,
        logChannel: logChannel,
        guild: guild,
        appName: appName,
        version: version
    });
});

// LOG für eine gelöschte Nachricht
client.on("messageDelete", message => {
    require("./commands/messageDelete").do({
        message: message,
        logChannel: logChannel,
        appName: appName,
        version: version,
        client: client
    });
});

// LOG für bearbeitete Nachricht
client.on("messageUpdate", (oldMessage, newMessage) => {
    require("./commands/messageUpdate").do({
        oldMessage: oldMessage,
        newMessage: newMessage,
        logChannel: logChannel,
        version: version,
        appName: appName
    });
});

/* client.on("raw", async packet => {
    if (!["MESSAGE_UPDATE", "MESSAGE_DELETE"].includes(packet.t)) return;

    if (!events.hasOwnProperty(packet.t)) return;

    let guild = client.guilds.get(packet.d.guild_id);

    let channel = guild.channels.get(packet.d.channel_id);

    let member = guild.members.get(packet.d.author.id);

    let messageLast = member.lastMessageID;
}); */

// Commands
client.on("message", async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // Checken ob die Nachricht aus einer Guild kam
    if (!message.guild) return;

    // Prävention: Bot kann nicht auf seine eigenen Nachrichten antworten
    if (message.author.bot) return;

    // shutdown Command
    if (message.content === `${adminPrefix} shutdown`) {
        require("./commands/shutdown").do({
            message: message,
            logChannel: logChannel,
            client: client,
            ownerID: ownerID
        });
    }

    if (message.content.startsWith(`${adminPrefix} eval`)) {
        require("./commands/eval").do({
            message: message,
            args: args,
            ownerID: ownerID
        });
    }

    // BAN Command
    if (message.content.startsWith(`${adminPrefix} ban`)) {
        require("./commands/ban").do({
            message: message,
<<<<<<< Updated upstream
            args: args
=======
            args: adminArgs,
            appName: appName,
            version: version,
            staffrole: staffrole,
            logChannel: logChannel,
            client: client
>>>>>>> Stashed changes
        });
    }

    if (message.content.startsWith(`${adminPrefix} purge`)) {
        require("./commands/purge").do({
            message: message,
            args: args,
            appName: appName,
            version: version,
            staffrole: staffrole
        });
    }

    // HELP Command
    if (message.content === `${prefix} help`) {
        require("./commands/help").do({
            message: message,
            prefix: prefix,
            appName: appName,
            version: version,
            adminPrefix: adminPrefix
        });
    }

    // MUTE Command
    if (message.content.startsWith(`${adminPrefix} mute`)) {
        require("./commands/mute").do({
            message: message,
            logChannel: logChannel,
            args: args,
            staffrole: staffrole,
            prefix: prefix,
            muterole: muterole,
            appName: appName,
            version: version
        });
    }

    // UNMUTE Command
    if (message.content.startsWith(`${adminPrefix} unmute`)) {
        require("./commands/unmute").do({
            message: message,
            logChannel: logChannel,
            args: args,
            staffrole: staffrole,
            prefix: prefix,
            muterole: muterole,
            appName: appName
        });
    }

    // KICK Command
    if (message.content.startsWith(`${adminPrefix} kick`)) {
        require("./commands/kick").do({
            message: message,
            logChannel: logChannel,
            args: args,
            staffrole: staffrole,
            appName: appName,
            version: version,
            prefix: prefix
        });
    }

    // WARN Command
    if (message.content.startsWith(`${adminPrefix} warn`)) {
        require("./commands/warn").do({
            message: message,
            logChannel: logChannel,
            args: args,
            staffrole: staffrole,
            prefix: prefix,
            appName: appName,
            version: version
        });
    }

    // USER Command (zeigt Infos z.B.: Mutes, Warns etc)
    if (message.content.startsWith(`${prefix} user`)) {
        require("./commands/user").do({
            message: message,
            logChannel: logChannel,
            staffrole: staffrole,
            prefix: prefix,
            appName: appName,
            version: version
        });
    }

    // Easter Egg :)
    if (message.content === `${prefix} random`) {
        require("./commands/random").do({
            message: message,
            appName: appName,
            version: version
        });
    }

    if (message.content === `${prefix} le`) {
        let emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
        await message.channel.send(emojiList);
    }

    if (message.content.startsWith(`${adminPrefix} tempmute`)) {
        require("./commands/tempmute").do({
            message: message,
            args: args,
            logChannel: logChannel,
            staffrole: staffrole,
            prefix: prefix,
            muterole: muterole,
            appName: appName,
            version: version
        });
    }

    if (message.content.startsWith(`${prefix}`) && args[0].match(/^(leitstellenspiel|meldkamerspel|missionchief)\.?(de|com)?$/gi)) {
        require("./commands/roleAdd_name").do({
            message: message,
            args: args,
            appName: appName,
            version: version,
            usRole: usRole,
            deRole: deRole,
            nlRole: nlRole,
            ukRole: ukRole,
            logChannel: logChannel
        });
    }

    // Not Working
    if (message.content === `${adminPrefix} announce`) {
        require("./commands/announce").do({
            message: message,
            logChannel: logChannel,
            appName: appName,
            version: version,
            staffrole: staffrole
        });
    }

    if (message.content.startsWith(`${prefix} game`)) {
        require("./commands/roleAdd_embed").do({
            message: message,
            args: args,
            logChannel: logChannel,
            appName: appName,
            version: version,
            usRole: usRole,
            deRole: deRole,
            nlRole: nlRole,
            ukRole: ukRole
        });
    }

    if (message.content.startsWith(`${prefix} ticket`)) {
        let cmdPartTwo = args[1];

        if (cmdPartTwo === "new") {
            require("./commands/ticket-system/ticket-new").do({
                message: message,
                args: args,
                logChannel: logChannel,
                prefix: prefix,
                staffrole: staffrole,
                appName: appName,
                version: version
            });
        } else if (cmdPartTwo === "add") {
            require("./commands/ticket-system/ticket-add").do({
                message: message,
                args: args,
                logChannel: logChannel,
                staffrole: staffrole,
                prefix: prefix,
                appName: appName,
                version: version
            });
        } else if (cmdPartTwo === "close") {
            require("./commands/ticket-system/ticket-close").do({
                message: message,
                args: args,
                logChannel: logChannel,
                staffrole: staffrole,
                prefix: prefix,
                appName: appName,
                version: version
            });
        } else if (cmdPartTwo === "topic") {
            require("./commands/ticket-system/ticket-topic").do({
                message: message,
                args: args,
                logChannel: logChannel,
                staffrole: staffrole,
                appName: appName,
                version
            });
        }
    }
});

// Connecten zu Discord
client.login(process.env.BOT_TOKEN);