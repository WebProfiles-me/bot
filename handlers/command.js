const { readdirSync } = require("fs");

module.exports = async (client) => {
  const commands = readdirSync(`./slash/`).filter((file) =>
    file.endsWith(".js")
  );

  for (let file of commands) {
    let pull = require(`../slash/${file}`);

    if (pull.name) {
      client.commands.set(pull.name, pull);
    } else {
    }
  }
};
