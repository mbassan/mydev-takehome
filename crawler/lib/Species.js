const swapi = require("../modules/swapi.module.js");
const SpeciesModel = require("../db/models/Species");
const { Log, numberOrNull, naToNull } = require("../db/util");

module.exports = class Species {
  static async getUrls(speciesUrls, personName) {
    try {
      Log.info(
        `Fetching list of species for person '${personName}' (count: ${speciesUrls.length})`
      );
      const speciesRecords = [];
      speciesUrls.forEach((url) => speciesRecords.push(swapi.get(url)));
      const res = (await Promise.all(speciesRecords)).filter((r) => r);
      Log.success(
        `Response: ${res.length} species found for person '${personName}'`
      );
      return res;
    } catch (err) {
      Log.error("Could not save species:", err);
    }
    return [];
  }

  static async saveList(speciesUrls, personName) {
    const speciesRecords = await this.getUrls(speciesUrls, personName);
    const formattedSpeciesRecords = speciesRecords.map((species) =>
      Species.format(species)
    );
    const exec = [];
    formattedSpeciesRecords.forEach((species) =>
      exec.push(Species.save(species))
    );
    const ids = await Promise.all(exec);
    return ids.map((idArray) => idArray._id);
  }

  static async save(species) {
    return SpeciesModel.findOneAndUpdate({ url: species.url }, species, {
      new: true,
      upsert: true,
      projection: " _id",
    });
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
    return naToNull({
      average_height: numberOrNull(average_height),
      average_lifespan: numberOrNull(average_lifespan),
      classification,
      designation,
      eye_colors,
      hair_colors,
      homeworld,
      language,
      name,
      skin_colors,
      url,
    });
  }
};
