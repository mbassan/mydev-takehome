require("dotenv").config();
const db = require("../db/db.module");
const swapi = require("../modules/swapi.module");
const Crawler = require("./Crawler");
const { Log } = require("../db/util");

module.exports = class Main {
  static async init() {
    try {
      await Promise.all([db.init(), swapi.init()]);
    } catch (err) {
      Log.error("An error occurred on startup! Exiting...", err);
      process.exit(1);
    }
    return Crawler.init();
  }
};
