const express = require("express");
const router = express.Router();
const providerController = require("../controller/provider");

router
  .route("/")
  .get(providerController.getAllProviders)
  .post(providerController.createProvider);

router
  .route("/:id")
  .get(providerController.getProviderById)
  .put(providerController.updateProvider)
  .delete(providerController.deleteProvider);

module.exports = router;
