const Discord = require("discord.js");

module.exports = {
  name: "status",
  description: "Fetch the current status of WebProfiles",
  run: async (client, interaction) => {
    let status = await client.statuspageStatus.summary();

    let embed = new Discord.MessageEmbed()
      .setTitle(`${status.page.name} Status`)
      .setDescription(
        `${getStatusEmoji(status.status.indicator)} ${
          status.status.description
        }`
      )
      .addField(
        "Component Status",
        `<:website:870467621022203965> **Main Website:** \`${
          status.components.find(
            (i) => i.id == fetchStatusElement("main_website", client)
          ).status
        }\`\n<:website:870467621022203965> **API:** \`${
          status.components.find(
            (i) => i.id == fetchStatusElement("api", client)
          ).status
        }\`\n<:cloudflare:876949952906027028> **Cloudflare:** \`${
          status.components.find(
            (i) => i.id == fetchStatusElement("cloudflare", client)
          ).status
        }\`\n<:email:876950107810041857> **E-Mail API:** \`${
          status.components.find(
            (i) => i.id == fetchStatusElement("email_api", client)
          ).status
        }\``
      )
      .setURL(status.page.url)
      .setColor("BLURPLE")
      .setTimestamp();

    let statusPageButton = new Discord.MessageButton()
      .setLabel("Status Page")
      .setURL(status.page.url)
      .setStyle("LINK");

    let actionRow = new Discord.MessageActionRow().addComponents([
      statusPageButton,
    ]);

    interaction.reply({ embeds: [embed], components: [actionRow] });
  },
};
function fetchStatusElement(component, client) {
  let componentFind = client.statuspage.statusElements.find(
    (i) => i.name == component
  );

  if (!componentFind) return "";
  return componentFind.id;
}

function getStatusEmoji(status) {
  switch (status) {
    case "none":
    case "resolved":
    case "operational":
      return "<:statusgreen:877167945023893524>";

    case "minor":
    case "monitoring":
    case "degraded_performance":
      return "<:statusyellow:877167883610886144>";

    case "major":
    case "partial_outage":
    case "investigating":
      return "<:statusorange:877167801696124988>";

    case "identified":
    case "major_outage":
    case "critical":
      return "<:statusred:877167714274250772>";

    case "postmortem":
      return "<:statusblue:877167622809088052>";
  }
}
