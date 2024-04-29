const connection = require("../server");

// Create a medical record
exports.createMedicalRecord = async (req, res, next) => {
  try {
    const { PatientID, DoctorID, TestResults, Medication, TreatmentPlan, Diagnosis } = req.body;
    connection.query(
      "INSERT INTO MedicalRecord (PatientID, DoctorID, TestResults, Medication, TreatmentPlan, Diagnosis) VALUES (?, ?, ?, ?, ?, ?)",
      [PatientID, DoctorID, TestResults, Medication, TreatmentPlan, Diagnosis],
      (err, result) => {
        if (err) {
          console.error("Error adding medical record:", err);
          res.status(500).json({ error: "An error occurred while adding the medical record" });
          return;
        }
        res.status(201).json({ message: "Medical record added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating medical record:", error);
    res.status(500).json({ error: "An error occurred while creating the medical record" });
  }
};


exports.getAllMedicalRecords = async (req, res, next) => {
  try {
    const query = `
      SELECT MedicalRecord.*, Patient.Name AS PatientName, Doctor.Name AS DoctorName
      FROM MedicalRecord
      INNER JOIN Patient ON MedicalRecord.PatientID = Patient.PatientID
      INNER JOIN Doctor ON MedicalRecord.DoctorID = Doctor.DoctorID
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error getting medical records:", err);
        res.status(500).json({ error: "An error occurred while getting medical records" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting medical records:", error);
    res.status(500).json({ error: "An error occurred while getting medical records" });
  }
};


// Get medical record by ID
exports.getMedicalRecordById = async (req, res, next) => {
  try {
    const recordID = req.params.id;
    connection.query('SELECT * FROM MedicalRecord WHERE RecordID = ?', [recordID], (err, result) => {
      if (err) {
        console.error('Error getting medical record:', err);
        res.status(500).json({ error: 'An error occurred while getting the medical record' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Medical record not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting medical record:', error);
    res.status(500).json({ error: 'An error occurred while getting the medical record' });
  }
};

// Update medical record by ID
exports.updateMedicalRecord = async (req, res, next) => {
  try {
    const recordID = req.params.id;
    const { PatientID, DoctorID, TestResults, Medication, TreatmentPlan, Diagnosis } = req.body;
    connection.query('UPDATE MedicalRecord SET PatientID=?, DoctorID=?, TestResults=?, Medication=?, TreatmentPlan=?, Diagnosis=? WHERE RecordID=?', 
    [PatientID, DoctorID, TestResults, Medication, TreatmentPlan, Diagnosis, recordID], (err, result) => {
      if (err) {
        console.error('Error updating medical record:', err);
        res.status(500).json({ error: 'An error occurred while updating the medical record' });
        return;
      }
      res.json({ message: 'Medical record updated successfully' });
    });
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({ error: 'An error occurred while updating the medical record' });
  }
};

// Delete medical record by ID
exports.deleteMedicalRecord = async (req, res, next) => {
  try {
    const recordID = req.params.id;
    connection.query('DELETE FROM MedicalRecord WHERE RecordID = ?', [recordID], (err, result) => {
      if (err) {
        console.error('Error deleting medical record:', err);
        res.status(500).json({ error: 'An error occurred while deleting the medical record' });
        return;
      }
      res.json({ message: 'Medical record deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting medical record:', error);
    res.status(500).json({ error: 'An error occurred while deleting the medical record' });
  }
};
