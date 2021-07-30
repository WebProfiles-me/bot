const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get an invite link for the WebProfiles bot",
  run: async (client, interaction) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Invite WebProfiles`)
      .setDescription(
        `[Invite 🔗](https://discord.com/oauth2/authorize?client_id=870400641544097883&permissions=0&scope=bot%20applications.commands)`
      )
      .setURL(
        `https://discord.com/oauth2/authorize?client_id=870400641544097883&permissions=0&scope=bot%20applications.commands`
      )
      .setColor("BLURPLE")
      .setTimestamp();

    let inviteButton = new Discord.MessageButton()
      .setLabel("Invite")
      .setURL(
        `https://discord.com/oauth2/authorize?client_id=870400641544097883&permissions=0&scope=bot%20applications.commands`
      )
      .setStyle("LINK");

    let actionRow = new Discord.MessageActionRow().addComponents([
      inviteButton,
    ]);

    interaction.reply({ embeds: [embed], components: [actionRow] });
  },
};
