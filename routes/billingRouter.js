const express = require("express");
const router = express.Router();
const billingController = require("../controller/billing");

router
  .route("/")
  .get(billingController.getAllBills)
  .post(billingController.createBill);

  router.route("/patientId/:patientid").get(billingController.getBillByPatientId)

router
  .route("/:id")
  .get(billingController.getBillById)
  .put(billingController.updateBill)
  .delete(billingController.deleteBill);

module.exports = router;
