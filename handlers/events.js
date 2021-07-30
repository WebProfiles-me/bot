const Discord = require("discord.js");
const klaw = require("klaw");
const path = require("path");

module.exports = (client) => {
  let events = [];
  klaw("./events")
    .on("readable", function () {
      let item;
      while ((item = this.read())) {
        events.push(item.path);
      }
    })
    .on("end", function () {
      events.forEach((fp) => {
        if (fp.endsWith(".js") == false) return;
        let evt = require(fp);
        let eName = path.basename(fp).replace(".js", "");
        client.on(eName, evt.bind(null, client));
      });
    });
};
