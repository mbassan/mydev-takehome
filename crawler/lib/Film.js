const swapi = require("../modules/swapi.module");
const Films = require("../db/models/Films");
const { Log, numberOrNull, naToNull } = require("../db/util");

module.exports = class Film {
  static async getUrls(filmUrls, personName) {
    try {
      Log.info(
        `Fetching list of films for person '${personName}' (count: ${filmUrls.length})`
      );
      const filmRecords = [];
      filmUrls.forEach((url) => filmRecords.push(swapi.get(url)));
      const res = (await Promise.all(filmRecords)).filter((r) => r);
      Log.success(
        `Response: ${res.length} films found for person '${personName}'`
      );
      return res;
    } catch (err) {
      Log.error("Could not save film:", err);
    }
    return [];
  }

  static async saveList(filmUrls, personName) {
    const filmRecords = await this.getUrls(filmUrls, personName);
    const formattedFilmRecords = filmRecords.map((film) => Film.format(film));
    const exec = [];
    formattedFilmRecords.forEach((film) => exec.push(Film.save(film)));
    const ids = await Promise.all(exec);
    return ids.map((idArray) => idArray._id);
  }

  static async save(film) {
    return Films.findOneAndUpdate({ url: film.url }, film, {
      new: true,
      upsert: true,
      projection: " _id",
    });
  }

  static format(film) {
    const {
      director,
      episode_id,
      opening_crawl,
      producer,
      release_date,
      title,
      url,
    } = film;
    return naToNull({
      director,
      episode_id: numberOrNull(episode_id),
      opening_crawl,
      producer,
      release_date,
      title,
      url,
    });
  }
};
