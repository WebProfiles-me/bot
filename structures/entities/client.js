const fs = require("fs");
const { Client, Collection } = require("discord.js");
const Profiles = require("profiles.js");
const configuration = require("../../config.json");

class Application extends Client {
  constructor(options) {
    super(options || []);
    this.commands = new Collection();

    this.config = require("../../config.json");
    this.badges = require("./badges.json");
    this.profiles = new Profiles({
      api_key: configuration.api_key,
    });
  }
}

module.exports = Application;
