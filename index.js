const Discord = require("discord.js");
const Application = require("./structures/entities/client.js");

const client = new Application({
  intents: [
    "GUILDS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_WEBHOOKS",
  ],
  allowedMentions: { repliedUser: false },
});

["events", "command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(client.config.token);
