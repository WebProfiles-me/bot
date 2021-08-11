const Discord = require("discord.js");

module.exports = {
  name: "user",
  description: "Fetch a registered user's socials",
  options: [
    {
      name: "username",
      type: "STRING",
      description: "The username of the user to fetch",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let userToFetch = interaction.options._hoistedOptions.find(
      (i) => i.name == "username"
    );
    let user = await client.profiles.fetchUser(userToFetch.value, "username");
    if (user.code == 404)
      return interaction.reply({
        ephemeral: true,
        content:
          "Looks like that user could not be found. Make sure that you spelled the username correctly, and try again.",
      });
    if (!user.id)
      return interaction.reply({
        ephemeral: true,
        content: "An unexpected error has occured. Try again later.",
      });

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`${user.username}`);
    embed.setDescription(
      user.badges.map((b) => fetchBadge(b, client)).join(" ")
    );
    embed.addField(
      "<:tag:870458971570462810> Username & ID",
      `${user.username} (\`${user.id}\`)`,
      true
    );
    if (user.caards_username) {
      embed.addField(
        "<:caards:870468812171014196> Caards",
        `[${user.caards_username}](https://crds.cc/${user.caards_username})`,
        true
      );
    }
    embed
      .addField(
        "Socials",
        `<:discord:870466372461817907> ${checkSocial(
          user.socials.discord[0],
          user
        )}\n<:linkedin:873574069864366104> ${checkSocial(
          user.socials.linkedin[0],
          user
        )}\n<:twitch:870466444704510003> ${checkSocial(
          user.socials.twitch[0],
          user
        )}\n<:twitter:870466507539349514> ${checkSocial(
          user.socials.twitter[0],
          user
        )}\n<:reddit:872880556742938677> ${checkSocial(
          user.socials.reddit[0],
          user
        )}\n<:youtube:870466576225300481> ${checkSocial(
          user.socials.youtube[0],
          user
        )}\n<:spotify:872901438345478184> ${checkSocial(
          user.socials.spotify[0],
          user
        )}\n<:website:870467621022203965> ${checkSocial(
          user.socials.website[0],
          user
        )}`
      )
      .setURL(`https://webprofiles.me/u/${user.username}`)
      .setColor("BLURPLE")
      .setTimestamp();

    let profileButton = new Discord.MessageButton()
      .setLabel("Profile")
      .setURL(`https://webprofiles.me/u/${user.username}`)
      .setStyle("LINK");

    let actionRow = new Discord.MessageActionRow().addComponents([
      profileButton,
    ]);

    interaction.reply({ embeds: [embed], components: [actionRow] });
  },
};

function checkSocial(social, user) {
  if (!social) return "`Not Linked`";

  if (social.user == user.id) return `[${social.id}](http://${social.id})`;
  if (social.user) return `\`${social.user}\``;
  return "`Not Linked`";
}

function fetchBadge(badge, client) {
  let badgeFind = client.badges.find((b) => b.name == badge);

  if (!badgeFind) return "";
  return badgeFind.value;
}
