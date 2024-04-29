const express = require("express");
const router = express.Router();
const inventoryItemPrescriptionController = require("../controller/inventoryItemPrescription");

router
  .route("/")
  .get(inventoryItemPrescriptionController.getAllInventoryItemPrescriptions)
  .post(inventoryItemPrescriptionController.createInventoryItemPrescription);

router
  .route("/:id")
  .get(inventoryItemPrescriptionController.getInventoryItemPrescriptionById)
  .put(inventoryItemPrescriptionController.updateInventoryItemPrescription)
  .delete(inventoryItemPrescriptionController.deleteInventoryItemPrescription);

module.exports = router;
