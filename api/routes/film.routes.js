const { Router } = require("express");
const { filmController } = require("../controllers");

const router = new Router({ mergeParams: true });
router.get("/", filmController.getMany);
router.get("/:filmId", filmController.getOne);

module.exports = router;
