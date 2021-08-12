const People = require("../db/models/People");
const Species = require("../db/models/Species");

async function getMany(req, res) {
  try {
    const { personId } = req.params;
    const { species } = await People.findById(personId, "species");
    if (!species) {
      return res.status(400).send("Could not find person");
    }
    const result = await Species.find({
      _id: { $in: species },
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Could not fetch species, please check your query parameters");
  }
}

async function getOne(req, res) {
  try {
    const { speciesId } = req.params;
    const result = await Species.findById(speciesId);
    if (!result) {
      return res.status(400).send("Could not find species");
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Could not fetch species");
  }
}

module.exports = {
  getMany,
  getOne,
};
