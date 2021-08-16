const Discord = require("discord.js");

module.exports = {
  name: "status",
  description: "Fetch the current status of WebProfiles",
  run: async (client, interaction) => {
    let status = await client.statuspageStatus.summary();

    let embed = new Discord.MessageEmbed()
      .setTitle(`${status.page.name} Status`)
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
