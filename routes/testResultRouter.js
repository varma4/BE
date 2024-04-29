const express = require("express");
const router = express.Router();
const testResultController = require("../controller/testResult");

router
  .route("/")
  .get(testResultController.getAllTestResults)
  .post(testResultController.createTestResult);

  router.route('/test-result/patient/:patientId').get(testResultController.getTestResultsByPatientId)
  router.route('/test-result/doctor/:doctorId').get(testResultController.getTestResultsByDoctorId)

router
  .route("/:id")
  .get(testResultController.getTestResultById)
  .put(testResultController.updateTestResult)
  .delete(testResultController.deleteTestResult);

module.exports = router;
