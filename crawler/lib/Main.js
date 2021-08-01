require("dotenv").config();
const db = require("../db/db.module.js");
const swapi = require("../modules/swapi.module.js");
const Crawler = require("./Crawler");
const Log = require("./Log");

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
