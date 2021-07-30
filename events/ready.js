const chalk = require("chalk");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = async (client) => {
  /* Status */
  client.user.setStatus("online");
  client.user.setActivity("webprofiles.me", {
    type: "WATCHING",
  });
  console.log(`Logged in as ${client.user.tag}`)

  /* Slash Command Handler */
  const slashCommands = readdirSync(`./slash/`).filter((file) =>
    file.endsWith(".js")
  );
  var cmdFetch = await client.application?.commands.fetch();

  for (let file of slashCommands) {
    let pull = require(`../slash/${file}`);

    if (pull.name) {
      var find = cmdFetch.find((i) => i.name === pull.name.toLowerCase());

      if (!find) {
        if (pull.options) {
          var data = {
            name: pull.name,
            description: pull.description,
            options: pull.options,
          };
        } else {
          var data = {
            name: pull.name,
            description: pull.description,
          };
        }
        let cmd = await client.application?.commands.create(data);
      }

      client.commands.set(pull.name, pull);
      console.log(chalk.blueBright(`Loaded `) + chalk.blueBright.bold(`${pull.name} `) + chalk.bgBlueBright.black(`(${find.id})`))
    }
  }
};
