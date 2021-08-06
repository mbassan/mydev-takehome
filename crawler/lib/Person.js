const People = require("../db/models/People");
const Film = require("./Film");
const Species = require("./Species");
const { Log, numberOrNull, naToNull, sleep } = require("../db/util");

module.exports = class Person {
  static async saveList(peopleResults) {
    try {
      const formattedPeople = peopleResults.map((person) =>
        Person.format(person)
      );

      sleep(3);
      const peopleWithFilms = await this.getFilmIds(
        peopleResults,
        formattedPeople
      );
      sleep(3);
      const peopleWithFilmsAndSpecies = await this.getSpeciesIds(
        peopleResults,
        peopleWithFilms
      );

      const exec = [];
      peopleWithFilmsAndSpecies.forEach((person) =>
        exec.push(Person.save(person))
      );
      return await Promise.all(exec);
    } catch (err) {
      Log.error("Could not save person list:", err);
    }
  }

  static async save(person) {
    return People.findOneAndUpdate({ url: person.url }, person, {
      new: true,
      upsert: true,
      projection: " _id",
    });
  }

  static format(person) {
    const {
      birth_year,
      eye_color,
      gender,
      hair_color,
      height,
      mass,
      name,
      skin_color,
      species,
      url,
    } = person;
    return naToNull({
      birth_year,
      eye_color,
      gender,
      hair_color,
      height: numberOrNull(height),
      mass: numberOrNull(mass),
      name,
      skin_color,
      species,
      url,
    });
  }

  static async getFilmIds(peopleResults, formattedPeople) {
    const filmOperations = [];
    peopleResults.forEach((person) =>
      filmOperations.push(Film.saveList(person.films, person.name))
    );
    const filmIds = await Promise.all(filmOperations);
    return formattedPeople.map((person, index) => ({
      ...person,
      films: filmIds[index],
    }));
  }

  static async getSpeciesIds(peopleResults, peopleWithFilms) {
    const speciesOperations = [];
    peopleResults.forEach((person) =>
      speciesOperations.push(Species.saveList(person.species, person.name))
    );
    const speciesIds = await Promise.all(speciesOperations);
    return peopleWithFilms.map((person, index) => ({
      ...person,
      species: speciesIds[index],
    }));
  }
};
