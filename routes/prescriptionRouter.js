const express = require("express");
const router = express.Router();
const prescriptionController = require("../controller/prescription");

router
  .route("/")
  .get(prescriptionController.getAllPrescriptions)
  .post(prescriptionController.createPrescription);

router.route("/patientId/:patientId").get(prescriptionController.getPrescriptionsByPatientId)

router
  .route("/:id")
  .get(prescriptionController.getPrescriptionById)
  .put(prescriptionController.updatePrescription)
  .delete(prescriptionController.deletePrescription);

module.exports = router;
