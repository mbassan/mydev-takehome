const swapi = require("../modules/swapi.module");
const Person = require("./Person");
const { Log, sleep } = require("../db/util");

module.exports = class Crawler {
  static async init() {
    this.crawl();
    return true;
  }

  static async crawl(nextUrl) {
    Log.start("Crawler tick starting:");
    Log.info("Fetching list of 'people'");
    let next = null;
    try {
      const peopleList = await swapi.get(nextUrl || "people");
      next = peopleList.next;
      Log.success(`Response: ${peopleList.results.length} 'people' found`);
      await Person.saveList(peopleList.results);
    } catch (err) {
      Log.error("Could not fetch people:", err);
    }
    await sleep(10);
    process.nextTick(() => this.crawl(next));
  }
};
