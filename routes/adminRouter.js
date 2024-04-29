const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");




router
  .route("/")
  .get(adminController.getAllAdminStaff)
  .post(adminController.createAdminStaff)

router
  .route("/:id")
  .get(adminController.getAdminStaffById)
  .put(adminController.updateAdminStaff)
  .delete(adminController.deleteAdminStaff);

module.exports = router;
