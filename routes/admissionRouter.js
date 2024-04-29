const express = require("express");
const router = express.Router();
const admissionController = require("../controller/admission");
router
  .route("/")
  .get(admissionController.getAllAdmissions)
  .post(admissionController.createAdmission);

router
  .route("/:id")
  .get(admissionController.getAdmissionById)
  .put(admissionController.updateAdmission)
  .delete(admissionController.deleteAdmission);

module.exports = router;
