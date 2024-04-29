const connection = require("../server");

exports.createSurgery = async (req, res, next) => {
  try {
    const { RoomID, DoctorID, Status,PatientID, SurgeryDate, SurgeryType } = req.body;
    connection.query(
      "INSERT INTO Surgery (RoomID, DoctorID, Status, PatientID, SurgeryDate, SurgeryType) VALUES (?,?, ?, ?, ?, ?)",
      [RoomID, DoctorID, Status, PatientID, SurgeryDate, SurgeryType],
      (err, result) => {
        if (err) {
          console.error("Error adding surgery:", err);
          res.status(500).json({ error: "An error occurred while adding the surgery" });
          return;
        }
        res.status(201).json({ message: "Surgery added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating surgery:", error);
    res.status(500).json({ error: "An error occurred while creating the surgery" });
  }
};

exports.getAllSurgeries = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Surgery", (err, results) => {
      if (err) {
        console.error("Error getting surgeries:", err);
        res.status(500).json({ error: "An error occurred while getting surgeries" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting surgeries:", error);
    res.status(500).json({ error: "An error occurred while getting surgeries" });
  }
};

exports.getSurgeryById = async (req, res, next) => {
  try {
    const surgeryID = req.params.id;
    connection.query('SELECT * FROM Surgery WHERE SurgeryID = ?', [surgeryID], (err, result) => {
      if (err) {
        console.error('Error getting surgery:', err);
        res.status(500).json({ error: 'An error occurred while getting the surgery' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Surgery not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting surgery:', error);
    res.status(500).json({ error: 'An error occurred while getting the surgery' });
  }
};

exports.getSurgeriesByPatientId = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    console.log(patientId);
    connection.query(`
      SELECT 
        S.*, 
        R.RoomNumber 
      FROM 
        Surgery S 
      JOIN 
        Room R 
      ON 
        S.RoomID = R.RoomID 
      WHERE 
        S.PatientID = ?`, 
      [patientId], 
      (err, result) => {
        if (err) {
          console.error('Error getting surgeries by patient ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the surgeries' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Surgeries for the patient not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting surgeries by patient ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the surgeries' });
  }
};

exports.getSurgeriesByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    connection.query(`
      SELECT 
        S.*, 
        R.RoomNumber 
      FROM 
        Surgery S 
      JOIN 
        Room R 
      ON 
        S.RoomID = R.RoomID 
      WHERE 
        S.DoctorID = ?`, 
      [doctorId], 
      (err, result) => {
        if (err) {
          console.error('Error getting surgeries by doctor ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the surgeries' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Surgeries for the doctor not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting surgeries by doctor ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the surgeries' });
  }
};



exports.updateSurgery = async (req, res, next) => {
  try {
    const surgeryID = req.params.id;
    const { RoomID, DoctorID, Status, SurgeryDate, SurgeryType } = req.body;
    
    // Extracting only the date part from the given ISO string
    const formattedSurgeryDate = new Date(SurgeryDate).toISOString().split('T')[0];

    connection.query('UPDATE Surgery SET RoomID=?, DoctorID=?, Status=?, SurgeryDate=?, SurgeryType=? WHERE SurgeryID=?', [RoomID, DoctorID, Status, formattedSurgeryDate, SurgeryType, surgeryID], (err, result) => {
      if (err) {
        console.error('Error updating surgery:', err);
        res.status(500).json({ error: 'An error occurred while updating the surgery' });
        return;
      }
      res.json({ message: 'Surgery updated successfully' });
    });
  } catch (error) {
    console.error('Error updating surgery:', error);
    res.status(500).json({ error: 'An error occurred while updating the surgery' });
  }
};


exports.deleteSurgery = async (req, res, next) => {
  try {
    const surgeryID = req.params.id;
    connection.query('DELETE FROM Surgery WHERE SurgeryID = ?', [surgeryID], (err, result) => {
      if (err) {
        console.error('Error deleting surgery:', err);
        res.status(500).json({ error: 'An error occurred while deleting the surgery' });
        return;
      }
      res.json({ message: 'Surgery deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting surgery:', error);
    res.status(500).json({ error: 'An error occurred while deleting the surgery' });
  }
};
