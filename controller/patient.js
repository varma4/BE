const connection = require("../server");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

exports.loginPatient = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    // Check if the email exists in the database
    connection.query(
      "SELECT * FROM Patient WHERE Email = ?",
      [Email],
      async (err, result) => {
        if (err) {
          console.error("Error logging in patient:", err);
          res
            .status(500)
            .json({ error: "An error occurred while logging in" });
          return;
        }

        if (result.length === 0) {
          // Email not found
          res.status(404).json({ error: "Patient not found" });
          return;
        }

        // Email found, compare passwords
        const hashedPassword = result[0].Password;
        const role = result[0].Role
        const patientID = result[0].PatientID
        const name = result[0].Name
        
        const passwordMatch = await bcrypt.compare(Password, hashedPassword);
      
        
        if (passwordMatch === false) {
          // Passwords do not match
          res.status(401).json({ error: "Incorrect password" });
          return;
        }
        delete result[0].Password;
        const token = await jwt.sign({patientID, role}, 'J1K1P1M1V1Z1G1N1M6');

        // Passwords match, login successful
        res.json({ message: "Login successful", token, name, patientID});
      }
    );
  } catch (error) {
    console.error("Error logging in patient:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};


exports.createPatient = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      PatientID,
      Name,
      Gender,
      DateOfBirth,
      ContactNumber,
      Address,
      Email,
      Password,
      InsuranceInformation,
    } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); 
    connection.query(
      "INSERT INTO Patient (PatientID, Name, Gender, DateOfBirth, ContactNumber, Address, Email, Password, InsuranceInformation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        PatientID,
        Name,
        Gender,
        DateOfBirth,
        ContactNumber,
        Address,
        Email,
        hashedPassword,
        InsuranceInformation,
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding patient:", err);
          res
            .status(500)
            .json({ error: "An error occurred while adding the patient" });
          return;
        }
        res.status(201).json({ message: "Patient added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the patient" });
  }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Patient", (err, results) => {
      if (err) {
        console.error("Error getting patients:", err);
        res
          .status(500)
          .json({ error: "An error occurred while getting patients" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting patients:", error);
    res.status(500).json({ error: "An error occurred while getting patients" });
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patientID = req.params.id;
    connection.query(
      "SELECT * FROM Patient WHERE PatientID = ?",
      [patientID],
      (err, result) => {
        if (err) {
          console.error("Error getting patient:", err);
          res
            .status(500)
            .json({ error: "An error occurred while getting the patient" });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: "Patient not found" });
          return;
        }
        res.json(result[0]);
      }
    );
  } catch (error) {
    console.error("Error getting patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the patient" });
  }
};

exports.updatePatientById = async (req, res, next) => {
  try {
    const patientID = req.params.id;
    const {
      Name,
      Gender,
      DateOfBirth,
      ContactNumber,
      Address,
      Email,
      InsuranceInformation,
    } = req.body;

    const dateOfBirth = new Date(DateOfBirth);

    // Format the date as 'YYYY-MM-DD'
    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

    connection.query(
      "UPDATE Patient SET Name=?, Gender=?, DateOfBirth=?, ContactNumber=?, Address=?, Email=?, InsuranceInformation=? WHERE PatientID=?",
      [
        Name,
        Gender,
        formattedDateOfBirth,
        ContactNumber,
        Address,
        Email,
        InsuranceInformation,
        patientID,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating patient:", err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the patient" });
          return;
        }
        res.json({ message: "Patient updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the patient" });
  }
};

exports.deletePatientById = async (req, res, next) => {
  try {
    const patientID = req.params.id;
    connection.query(
      "DELETE FROM Patient WHERE PatientID = ?",
      [patientID],
      (err, result) => {
        if (err) {
          console.error("Error deleting patient:", err);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the patient" });
          return;
        }
        res.json({ message: "Patient deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the patient" });
  }
};
