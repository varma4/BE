const connection = require("../server");

exports.createAdmission = async (req, res, next) => {
  try {
    const { PatientID, RoomID, Status, Reason, DischargeDate, AdmissionDate } = req.body;
    connection.query(
      "INSERT INTO Admission (PatientID, RoomID, Status, Reason, DischargeDate, AdmissionDate) VALUES (?, ?, ?, ?, ?, ?)",
      [PatientID, RoomID, Status, Reason, DischargeDate, AdmissionDate],
      (err, result) => {
        if (err) {
          console.error("Error adding admission:", err);
          res.status(500).json({ error: "An error occurred while adding the admission" });
          return;
        }
        res.status(201).json({ message: "Admission added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating admission:", error);
    res.status(500).json({ error: "An error occurred while creating the admission" });
  }
};

exports.getAllAdmissions = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Admission", (err, results) => {
      if (err) {
        console.error("Error getting admissions:", err);
        res.status(500).json({ error: "An error occurred while getting admissions" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting admissions:", error);
    res.status(500).json({ error: "An error occurred while getting admissions" });
  }
};

exports.getAdmissionById = async (req, res, next) => {
  try {
    const admissionID = req.params.id;
    connection.query('SELECT * FROM Admission WHERE AdmissionID = ?', [admissionID], (err, result) => {
      if (err) {
        console.error('Error getting admission:', err);
        res.status(500).json({ error: 'An error occurred while getting the admission' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Admission not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting admission:', error);
    res.status(500).json({ error: 'An error occurred while getting the admission' });
  }
};

exports.updateAdmission = async (req, res, next) => {
  try {
    const admissionID = req.params.id;
    const { PatientID, RoomID, Status, Reason, DischargeDate, AdmissionDate } = req.body;

    // Extracting only the date part from the given ISO strings for DischargeDate and AdmissionDate
    const formattedDischargeDate = new Date(DischargeDate).toISOString().split('T')[0];
    const formattedAdmissionDate = new Date(AdmissionDate).toISOString().split('T')[0];

    connection.query('UPDATE Admission SET PatientID=?, RoomID=?, Status=?, Reason=?, DischargeDate=?, AdmissionDate=? WHERE AdmissionID=?', [PatientID, RoomID, Status, Reason, formattedDischargeDate, formattedAdmissionDate, admissionID], (err, result) => {
      if (err) {
        console.error('Error updating admission:', err);
        res.status(500).json({ error: 'An error occurred while updating the admission' });
        return;
      }
      res.json({ message: 'Admission updated successfully' });
    });
  } catch (error) {
    console.error('Error updating admission:', error);
    res.status(500).json({ error: 'An error occurred while updating the admission' });
  }
};


exports.deleteAdmission = async (req, res, next) => {
  try {
    const admissionID = req.params.id;
    connection.query('DELETE FROM Admission WHERE AdmissionID = ?', [admissionID], (err, result) => {
      if (err) {
        console.error('Error deleting admission:', err);
        res.status(500).json({ error: 'An error occurred while deleting the admission' });
        return;
      }
      res.json({ message: 'Admission deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting admission:', error);
    res.status(500).json({ error: 'An error occurred while deleting the admission' });
  }
};
