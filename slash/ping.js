const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Send a ping request to Discord's API",
  run: async (client, interaction) => {
    return interaction.defer().then(async (msg) => {
      let ping = new Date().getTime() - interaction.createdTimestamp;

      let embed = new Discord.MessageEmbed()
        .setTitle(`🏓 Pong`)
        .setDescription(
          `:heartbeat: Discord Message Latency: \`${ping}ms\`\n\n:bar_chart: Websocket Latency: \`${Math.round(
            client.ws.ping
          )}ms\``
        )
        .setColor("BLURPLE")
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    });
  },
};
