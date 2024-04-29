const express = require("express");
const router = express.Router();
const departmentController = require("../controller/department");

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .put(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
