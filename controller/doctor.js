const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require("../server");

exports.loginDoctor = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    console.log(req.body);

    // Check if the email exists in the database
    connection.query(
      "SELECT * FROM Doctor WHERE Email = ?",
      [Email],
      async (err, result) => {
        if (err) {
          console.error("Error logging in doctor:", err);
          res
            .status(500)
            .json({ error: "An error occurred while logging in" });
          return;
        }

        if (result.length === 0) {
          // Email not found
          res.status(404).json({ error: "Doctor not found" });
          return;
        }

        // Email found, compare passwords
        const hashedPassword = result[0].Password;
        const doctorID = result[0].DoctorID;
        const role = result[0].Role
        const doctorId = result[0].DoctorID
        const passwordMatch = await bcrypt.compare(Password, hashedPassword);
        
        if (!passwordMatch) {
          // Passwords do not match
          res.status(401).json({ error: "Incorrect password" });
          return;
        }

        // Passwords match, generate JWT token
        const token = jwt.sign({ doctorID, role }, 'J1K1P1M1V1Z1G1N1M6', { expiresIn: '1h' });

        // Login successful, return JWT token
        res.json({ message: "Login successful", token, role,doctorId });
      }
    );
  } catch (error) {
    console.error("Error logging in doctor:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const { Name, ContactNumber, Email, Password ,Scheduling } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); 
    connection.query(
      "INSERT INTO Doctor (Name, ContactNumber, Email,Password, Scheduling) VALUES (?,?, ?, ?, ?)",
      [Name, ContactNumber, Email, hashedPassword, Scheduling],
      (err, result) => {
        if (err) {
          console.error("Error adding doctor:", err);
          res
            .status(500)
            .json({ error: "An error occurred while adding the doctor" });
          return;
        }
        res.status(201).json({ message: "Doctor added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating doctor:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the doctor" });
  }
};


// Get all doctors
exports.getAllDoctors = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Doctor", (err, results) => {
      if (err) {
        console.error("Error getting doctors:", err);
        res
          .status(500)
          .json({ error: "An error occurred while getting doctors" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting doctors:", error);
    res.status(500).json({ error: "An error occurred while getting doctors" });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctorID = req.params.id;
    connection.query(
      "SELECT * FROM Doctor WHERE DoctorID = ?",
      [doctorID],
      (err, result) => {
        if (err) {
          console.error("Error getting doctor:", err);
          res
            .status(500)
            .json({ error: "An error occurred while getting the doctor" });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: "Doctor not found" });
          return;
        }
        res.json(result[0]);
      }
    );
  } catch (error) {
    console.error("Error getting doctor:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the doctor" });
  }
};

// Update doctor by ID
exports.updateDoctorById = async (req, res, next) => {
  try {
    const doctorID = req.params.id;
    const { Name, ContactNumber, Email, Scheduling, Role  } = req.body;
    connection.query(
      "UPDATE Doctor SET Name=?, ContactNumber=?, Email=?,Role=?, Scheduling=? WHERE DoctorID=?",
      [Name, ContactNumber, Email,Role, Scheduling, doctorID],
      (err, result) => {
        if (err) {
          console.error("Error updating doctor:", err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the doctor" });
          return;
        }
        res.json({ message: "Doctor updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating doctor:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the doctor" });
  }
};

// Delete doctor by ID
exports.deleteDoctorById = async (req, res, next) => {
  try {
    const doctorID = req.params.id;
    connection.query(
      "DELETE FROM Doctor WHERE DoctorID = ?",
      [doctorID],
      (err, result) => {
        if (err) {
          console.error("Error deleting doctor:", err);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the doctor" });
          return;
        }
        res.json({ message: "Doctor deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the doctor" });
  }
};
