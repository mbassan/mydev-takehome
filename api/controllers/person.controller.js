const People = require("../db/models/People");

async function getMany(req, res) {
  try {
    const { name, gender, heightMin, heightMax, eye_color, page, perPage } =
      req.query;
    const query = {};
    if (name) {
      query["$text"] = {
        $search: name,
        $language: "en",
        $caseSensitive: false,
      };
    }
    if (gender) {
      query.gender = gender;
    }
    if (heightMin) {
      query.height = { $gte: heightMin };
    }
    if (heightMax) {
      if (query.height) {
        query.height["$lte"] = heightMax;
      } else {
        query.height = { $gte: heightMin };
      }
    }
    if (eye_color) {
      query.eye_color = eye_color;
    }

    const result = await People.paginate(query, {
      page: page || 1,
      limit: perPage || 30,
    });
    return res.json(result);
  } catch (err) {
    return res
      .status(500)
      .send("Could not fetch people, please check your query parameters");
  }
}

async function getOne(req, res) {
  try {
    const { personId } = req.params;
    const result = await People.findById(personId);
    if (!result) {
      return res.status(400).send("Could not find person");
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Could not fetch person");
  }
}

module.exports = {
  getMany,
  getOne,
};
