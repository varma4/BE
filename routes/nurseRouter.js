const express = require("express");
const router = express.Router();
const nurseController = require("../controller/nurse");

router
  .route("/")
  .get(nurseController.getAllNurses)
  .post(nurseController.createNurse);

router
  .route("/:id")
  .get(nurseController.getNurseById)
  .put(nurseController.updateNurseById)
  .delete(nurseController.deleteNurseById);

module.exports = router;
