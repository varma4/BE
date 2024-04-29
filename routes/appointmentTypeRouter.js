const express = require("express");
const router = express.Router();
const appointmentTypeController = require("../controller/appointmentType");

router
  .route("/")
  .get(appointmentTypeController.getAllAppointmentTypes)
  .post(appointmentTypeController.createAppointmentType);

router
  .route("/:id")
  .get(appointmentTypeController.getAppointmentTypeById)
  .put(appointmentTypeController.updateAppointmentType)
  .delete(appointmentTypeController.deleteAppointmentType);

module.exports = router;
