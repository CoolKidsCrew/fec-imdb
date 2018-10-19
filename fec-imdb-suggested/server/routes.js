const router = require("express").Router();
const controller = require("./controller.js");

router
  .route("/:index")
  .get(controller.get)

module.exports = router;