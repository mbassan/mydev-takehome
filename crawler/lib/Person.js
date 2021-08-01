const Log = require("./Log");
const People = require("../db/models/People");
const Film = require("./Film");
const Species = require("./Species");

module.exports = class Person {
  static async saveList(peopleResults) {
    try {
      const formattedPeople = peopleResults.map((person) =>
        Person.format(person)
      );
      const peopleWithFilms = await this.getFilmIds(
        peopleResults,
        formattedPeople
      );
      const peopleWithFilmsAndSpecies = await this.getSpeciesIds(
        peopleResults,
        peopleWithFilms
      );
      return People.insertMany(peopleWithFilmsAndSpecies);
    } catch (err) {
      Log.error("Could not save person list:", err);
    }
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
    return {
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
    };
  }

  static async getFilmIds(peopleResults, formattedPeople) {
    const filmOperations = [];
    peopleResults.forEach((person) =>
      filmOperations.push(Film.getUrls(person.films))
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
      speciesOperations.push(Species.getUrls(person.species))
    );
    const speciesIds = await Promise.all(speciesOperations);
    return peopleWithFilms.map((person, index) => ({
      ...person,
      species: speciesIds[index],
    }));
  }
};
