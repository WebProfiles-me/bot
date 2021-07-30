const Discord = require("discord.js");
const chalk = require("chalk");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.user.bot) return;

  var cmd = await client.application?.commands
    .fetch(interaction.commandId)
    .catch((e) => undefined);
  if (!cmd)
    return await interaction.reply(
      interactionError("INTERACTION_CMD_NOT_FOUND", client)
    );

  let command = client.commands.get(cmd.name.toLowerCase());
  if (!command)
    return await interaction.reply(
      interactionError("INTERACTION_CMD_NOT_FOUND", client)
    );

  if (command) {
    command.run(client, interaction).catch(async (e) => {
      return await interaction.reply(interactionError(e.message, client));
    });
  }
};

function interactionError(errCode, client) {
  let noCMDEmbed = new Discord.MessageEmbed()
    .setTitle(`<:error:848005856683098152> Bot Error`)
    .setDescription(
      `It looks like Marketcord encountered an error while executing this command! Please join our support server and open a ticket about this issue.\n\nError Code: ${errCode}\nSupport Server: [https://discord.gg/eJ5RkCc2fs](https://discord.gg/eJ5RkCc2fs)`
    )
    .setColor("RED")
    .setTimestamp();

  return { embeds: [noCMDEmbed] };
}
