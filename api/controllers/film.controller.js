const People = require("../db/models/People");
const Films = require("../db/models/Films");

async function getMany(req, res) {
  try {
    const { personId } = req.params;
    const { films } = await People.findById(personId, "films");
    if (!films) {
      return res.status(400).send("Could not find person");
    }
    const result = await Films.find({
      _id: { $in: films },
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Could not fetch films, please check your query parameters");
  }
}

async function getOne(req, res) {
  try {
    const { filmId } = req.params;
    const result = await Films.findById(filmId);
    if (!result) {
      return res.status(400).send("Could not find film");
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Could not fetch film");
  }
}

module.exports = {
  getMany,
  getOne,
};
