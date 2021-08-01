const Log = require("./Log");
const SpeciesModel = require("../db/models/Species");

module.exports = class Species {
  static async getUrls(speciesUrls) {
    try {
      const speciesRecords = [];
      speciesUrls.forEach((url) => speciesRecords.push(swapi.get(url)));
      return Promise.all(speciesUrls);
    } catch (err) {
      Log.error("Could not save species:", err);
    }
    return [];
  }

  static async saveList(speciesUrls) {
    const speciesRecords = await this.getUrls(speciesUrls);
    const formattedFilmRecords = speciesRecords.map((film) =>
      Species.format(species)
    );
    return SpeciesModel.insertMany(formattedFilmRecords);
  }

  static format(species) {
    const {
      average_height,
      average_lifespan,
      classification,
      designation,
      eye_colors,
      hair_colors,
      homeworld,
      language,
      name,
      skin_colors,
      url,
    } = species;
    return {
      average_height,
      average_lifespan,
      classification,
      designation,
      eye_colors,
      hair_colors,
      homeworld,
      language,
      name,
      skin_colors,
      url,
    };
  }
};
