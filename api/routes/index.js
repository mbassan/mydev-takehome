const { Router } = require("express");
const personRoutes = require("./person.routes");
const filmRoutes = require("./film.routes");
const speciesRoutes = require("./species.routes");

const router = new Router();
router.get("/", (req, res) => res.send("done"));
router.use("/people", personRoutes);
router.use("/people/:personId/films", filmRoutes);
router.use("/people/:personId/species", speciesRoutes);

module.exports = router;
