const express = require("express");
const router = express.Router();
const patientController = require("../controller/patient");
const jwt = require("jsonwebtoken");

function authorize(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, "J1K1P1M1V1Z1G1N1M6");

      const userRole = decodedToken.role;
      console.log(userRole);

      if (userRole === role || userRole === "admin") {
        next();
      } else {
        return res.status(403).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}




router.get("/", authorize("doctor"), patientController.getAllPatients);

router.route('/login').post(patientController.loginPatient)

// Routes accessible by admins only

router
  .route("/")
  .get(authorize("admin"), patientController.getAllPatients)
  .post( patientController.createPatient);

router
  .route("/:id")
  .put(authorize("admin"), patientController.updatePatientById)
  .delete(authorize("admin"), patientController.deletePatientById);

module.exports = router;
