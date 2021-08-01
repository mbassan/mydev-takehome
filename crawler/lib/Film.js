const swapi = require("../modules/swapi.module.js");
const Log = require("./Log");
const Films = require("../db/models/Films");

module.exports = class Film {
  static async getUrls(filmUrls) {
    try {
      const filmRecords = [];
      filmUrls.forEach((url) => filmRecords.push(swapi.get(url)));
      return Promise.all(filmUrls);
    } catch (err) {
      Log.error("Could not save film:", err);
    }
    return [];
  }

  static async saveList(filmUrls) {
    const filmRecords = await this.getUrls(filmUrls);
    const formattedFilmRecords = filmRecords.map((film) => Film.format(film));
    return Films.insertMany(formattedFilmRecords);
  }

  static format(film) {
    const {
      director,
      episode_id,
      opening_crawl,
      producer,
      release_date,
      species,
      title,
      url,
    } = film;
    return {
      director,
      episode_id,
      opening_crawl,
      producer,
      release_date,
      species,
      title,
      url,
    };
  }
};
