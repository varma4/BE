const express = require("express");
const router = express.Router();
const medicalRecord = require("../controller/medicalRecord");

router
  .route("/")
  .get(medicalRecord.getAllMedicalRecords)
  .post(medicalRecord.createMedicalRecord);

router
  .route("/:id")
  .get(medicalRecord.getMedicalRecordById)
  .put(medicalRecord.updateMedicalRecord)
  .delete(medicalRecord.deleteMedicalRecord);

module.exports = router;
