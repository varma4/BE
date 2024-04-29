const express = require("express");
const router = express.Router();
const surgeryController = require("../controller/surgery");

router
  .route("/")
  .get(surgeryController.getAllSurgeries)
  .post(surgeryController.createSurgery);

  router.route("/patient/:patientId").get(surgeryController.getSurgeriesByPatientId)
  router.route("/doctor/:doctorId").get(surgeryController.getSurgeriesByDoctorId)

router
  .route("/:id")
  .get(surgeryController.getSurgeryById)
  .put(surgeryController.updateSurgery)
  .delete(surgeryController.deleteSurgery);

module.exports = router;
