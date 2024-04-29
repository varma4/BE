const express = require("express");
const router = express.Router();
const testController = require("../controller/test");

router
  .route("/")
  .get(testController.getAllTests)
  .post(testController.createTest);

router
  .route("/:id")
  .get(testController.getTestById)
  .put(testController.updateTest)
  .delete(testController.deleteTest);

module.exports = router;
