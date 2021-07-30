const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Send a ping request to Discord's API",
  run: async (client, interaction) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`🏓 Pong`)
      .setDescription(
        `📊 WS Response Time: \`${client.ws.ping}\``
      )
      .setColor("BLURPLE")
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
