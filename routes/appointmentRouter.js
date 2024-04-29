const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointment");

router
  .route("/")
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

  router.route("/patient/:patientId")
  .get(appointmentController.getAppointmentByPatientId);
  router.route("/doctorId/:doctorId")
  .get(appointmentController.getAppointmentByDoctorId);


router
  .route("/:id")
  .get(appointmentController.getAppointmentById)
  .put(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;
