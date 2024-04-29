const express = require("express");
const router = express.Router();
const doctorController = require("../controller/doctor");

router
  .route("/")
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);

  router.route("/login").post(doctorController.loginDoctor)
router
  .route("/:id")
  .get(doctorController.getDoctorById)
  .put(doctorController.updateDoctorById)
  .delete(doctorController.deleteDoctorById);

module.exports = router;
