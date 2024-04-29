const connection = require("../server");

exports.createTestResult = async (req, res, next) => {
  try {
    const { TestID, PatientID, DoctorID, ResultDetails, ResultDate } = req.body;
    connection.query(
      "INSERT INTO TestResult (TestID, PatientID, DoctorID, ResultDetails, ResultDate) VALUES (?, ?, ?, ?, ?)",
      [TestID, PatientID, DoctorID, ResultDetails, ResultDate],
      (err, result) => {
        if (err) {
          console.error("Error creating test result:", err);
          res.status(500).json({ error: "An error occurred while creating the test result" });
          return;
        }
        res.status(201).json({ message: "Test result created successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating test result:", error);
    res.status(500).json({ error: "An error occurred while creating the test result" });
  }
};

exports.getAllTestResults = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM TestResult", (err, results) => {
      if (err) {
        console.error("Error getting test results:", err);
        res.status(500).json({ error: "An error occurred while getting test results" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting test results:", error);
    res.status(500).json({ error: "An error occurred while getting test results" });
  }
};

exports.getTestResultById = async (req, res, next) => {
  try {
    const resultID = req.params.id;
    connection.query('SELECT * FROM TestResult WHERE ResultID = ?', [resultID], (err, result) => {
      if (err) {
        console.error('Error getting test result:', err);
        res.status(500).json({ error: 'An error occurred while getting the test result' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Test result not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting test result:', error);
    res.status(500).json({ error: 'An error occurred while getting the test result' });
  }
};

exports.getTestResultsByPatientId = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    connection.query(`
      SELECT 
        TR.*, 
        T.Name 
      FROM 
        TestResult TR 
      JOIN 
        Test T 
      ON 
        TR.TestID = T.TestID 
      WHERE 
        TR.PatientID = ?`, 
      [patientId], 
      (err, result) => {
        if (err) {
          console.error('Error getting test results by patient ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the test results' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Test results for the patient not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting test results by patient ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the test results' });
  }
};

exports.getTestResultsByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    connection.query(`
      SELECT 
        TR.*, 
        T.Name 
      FROM 
        TestResult TR 
      JOIN 
        Test T 
      ON 
        TR.TestID = T.TestID 
      WHERE 
        TR.DoctorID = ?`, 
      [doctorId], 
      (err, result) => {
        if (err) {
          console.error('Error getting test results by doctor ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the test results' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Test results for the doctor not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting test results by doctor ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the test results' });
  }
};


exports.updateTestResult = async (req, res, next) => {
  try {
    const resultID = req.params.id;
    const { TestID, PatientID, DoctorID, ResultDetails, ResultDate } = req.body;
    
    // Extracting only the date part from the given ISO string
    const formattedDate = new Date(ResultDate).toISOString().split('T')[0];

    connection.query('UPDATE TestResult SET TestID=?, PatientID=?, DoctorID=?, ResultDetails=?, ResultDate=? WHERE ResultID=?', [TestID, PatientID, DoctorID, ResultDetails, formattedDate, resultID], (err, result) => {
      if (err) {
        console.error('Error updating test result:', err);
        res.status(500).json({ error: 'An error occurred while updating the test result' });
        return;
      }
      res.json({ message: 'Test result updated successfully' });
    });
  } catch (error) {
    console.error('Error updating test result:', error);
    res.status(500).json({ error: 'An error occurred while updating the test result' });
  }
};


exports.deleteTestResult = async (req, res, next) => {
  try {
    const resultID = req.params.id;
    connection.query('DELETE FROM TestResult WHERE ResultID = ?', [resultID], (err, result) => {
      if (err) {
        console.error('Error deleting test result:', err);
        res.status(500).json({ error: 'An error occurred while deleting the test result' });
        return;
      }
      res.json({ message: 'Test result deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting test result:', error);
    res.status(500).json({ error: 'An error occurred while deleting the test result' });
  }
};
