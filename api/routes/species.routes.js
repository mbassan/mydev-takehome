const { Router } = require("express");
const { speciesController } = require("../controllers");

const router = new Router({ mergeParams: true });
router.get("/", speciesController.getMany);
router.get("/:speciesId", speciesController.getOne);

module.exports = router;
