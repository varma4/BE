const express = require("express");
const router = express.Router();
const inventoryItemController = require("../controller/inventoryItem");

router
  .route("/")
  .get(inventoryItemController.getAllInventoryItems)
  .post(inventoryItemController.createInventoryItem);

router
  .route("/:id")
  .get(inventoryItemController.getInventoryItemById)
  .put(inventoryItemController.updateInventoryItem)
  .delete(inventoryItemController.deleteInventoryItem);

module.exports = router;
