const connection = require("../server");

exports.createPrescription = async (req, res, next) => {
  try {
    const { PatientID, DoctorID, Date, Medication, Dosage, Frequency, Duration } = req.body;
    connection.query(
      "INSERT INTO Prescription (PatientID, DoctorID, Date, Medication, Dosage, Frequency, Duration) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [PatientID, DoctorID, Date, Medication, Dosage, Frequency, Duration],
      (err, result) => {
        if (err) {
          console.error("Error creating prescription:", err);
          res.status(500).json({ error: "An error occurred while creating the prescription" });
          return;
        }
        res.status(201).json({ message: "Prescription created successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ error: "An error occurred while creating the prescription" });
  }
};

exports.getAllPrescriptions = async (req, res, next) => {
  try {
    const query = `
      SELECT Prescription.*, Patient.Name AS PatientName, Doctor.Name AS DoctorName
      FROM Prescription
      INNER JOIN Patient ON Prescription.PatientID = Patient.PatientID
      INNER JOIN Doctor ON Prescription.DoctorID = Doctor.DoctorID
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error getting prescriptions:", err);
        res.status(500).json({ error: "An error occurred while getting prescriptions" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting prescriptions:", error);
    res.status(500).json({ error: "An error occurred while getting prescriptions" });
  }
};


exports.getPrescriptionById = async (req, res, next) => {
  try {
    const prescriptionID = req.params.id;
    connection.query('SELECT * FROM Prescription WHERE PrescriptionID = ?', [prescriptionID], (err, result) => {
      if (err) {
        console.error('Error getting prescription:', err);
        res.status(500).json({ error: 'An error occurred while getting the prescription' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Prescription not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting prescription:', error);
    res.status(500).json({ error: 'An error occurred while getting the prescription' });
  }
};

exports.getPrescriptionsByPatientId = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    console.log(req.params.patientId);
    connection.query(`
      SELECT 
        P.*, 
        D.Name AS DoctorName,
        P2.Name AS PatientName
      FROM 
        Prescription P
      JOIN 
        Doctor D 
      ON 
        P.DoctorID = D.DoctorID 
      JOIN 
        Patient P2
      ON 
        P.PatientID = P2.PatientID
      WHERE 
        P.PatientID = ?`, 
      [patientId], 
      (err, result) => {
        if (err) {
          console.error('Error getting prescriptions by patient ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the prescriptions' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Prescriptions for the patient not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting prescriptions by patient ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the prescriptions' });
  }
};


exports.updatePrescription = async (req, res, next) => {
  try {
    const prescriptionID = req.params.id;
    const { PatientID, DoctorID, PrescriptionDate, Medication, Dosage, Frequency, Duration } = req.body;
    
    // Extracting only the date part from the given ISO string
    const formattedDate = new Date(PrescriptionDate).toISOString().split('T')[0];

    connection.query('UPDATE Prescription SET PatientID=?, DoctorID=?, PrescriptionDate=?, Medication=?, Dosage=?, Frequency=?, Duration=? WHERE PrescriptionID=?', [PatientID, DoctorID, formattedDate, Medication, Dosage, Frequency, Duration, prescriptionID], (err, result) => {
      if (err) {
        console.error('Error updating prescription:', err);
        res.status(500).json({ error: 'An error occurred while updating the prescription' });
        return;
      }
      res.json({ message: 'Prescription updated successfully' });
    });
  } catch (error) {
    console.error('Error updating prescription:', error);
    res.status(500).json({ error: 'An error occurred while updating the prescription' });
  }
};



exports.deletePrescription = async (req, res, next) => {
  try {
    const prescriptionID = req.params.id;
    connection.query('DELETE FROM Prescription WHERE PrescriptionID = ?', [prescriptionID], (err, result) => {
      if (err) {
        console.error('Error deleting prescription:', err);
        res.status(500).json({ error: 'An error occurred while deleting the prescription' });
        return;
      }
      res.json({ message: 'Prescription deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    res.status(500).json({ error: 'An error occurred while deleting the prescription' });
  }
};
