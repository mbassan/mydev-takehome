const swapi = require("../modules/swapi.module.js");
const Log = require("./Log");
const Person = require("./Person");
const sleep = require("../db/util/sleep");

module.exports = class Crawler {
  static async init() {
    this.getPeopleList();
    return true;
  }

  static async getPeopleList(currency, nextUrl) {
    let next = null;
    try {
      const peopleList = await swapi.get(nextUrl || "people");
      next = peopleList.next;
      await Person.saveList(peopleList.results);
    } catch (err) {
      Log.error("Could not fetch people:", err);
    }
    await sleep(5);
    process.nextTick(() => this.getPeopleList(currency, next));
  }
};
