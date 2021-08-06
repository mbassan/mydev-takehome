const { Router } = require("express");
const { personController } = require("../controllers");

const router = new Router({ mergeParams: true });
router.get("/", personController.getMany);
router.get("/:personId", personController.getOne);

module.exports = router;
