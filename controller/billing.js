const connection = require("../server");

exports.createBill = async (req, res, next) => {
  try {
    const { PatientID, TotalAmount, PaymentStatus, BillDate } = req.body;
    connection.query(
      "INSERT INTO Billing (PatientID, TotalAmount, PaymentStatus, BillDate) VALUES (?, ?, ?, ?)",
      [PatientID, TotalAmount, PaymentStatus, BillDate],
      (err, result) => {
        if (err) {
          console.error("Error creating bill:", err);
          res.status(500).json({ error: "An error occurred while creating the bill" });
          return;
        }
        res.status(201).json({ message: "Bill created successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ error: "An error occurred while creating the bill" });
  }
};

exports.getAllBills = async (req, res, next) => {
  try {
    connection.query(
      "SELECT Billing.*, Patient.Name AS PatientName FROM Billing JOIN Patient ON Billing.PatientID = Patient.PatientID",
      (err, results) => {
        if (err) {
          console.error("Error getting bills:", err);
          res.status(500).json({ error: "An error occurred while getting bills" });
          return;
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error("Error getting bills:", error);
    res.status(500).json({ error: "An error occurred while getting bills" });
  }
};


exports.getBillById = async (req, res, next) => {
  try {
    const billID = req.params.id;
    connection.query('SELECT * FROM Billing WHERE BillID = ?', [billID], (err, result) => {
      if (err) {
        console.error('Error getting bill:', err);
        res.status(500).json({ error: 'An error occurred while getting the bill' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Bill not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting bill:', error);
    res.status(500).json({ error: 'An error occurred while getting the bill' });
  }
};

exports.getBillByPatientId = async (req, res, next) => {
  try {
    const patientID = req.params.patientid; // Use patientid instead of billID
    console.log(patientID);
    connection.query(`
      SELECT 
        Billing.*, 
        Patient.Name AS PatientName
      FROM 
        Billing
      JOIN 
        Patient 
      ON 
        Billing.PatientID = Patient.PatientID
      WHERE 
        Billing.PatientID = ?`, 
      [patientID], // Use patientID for the query parameter
      (err, result) => {
        if (err) {
          console.error('Error getting bill:', err);
          res.status(500).json({ error: 'An error occurred while getting the bill' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Bill not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting bill:', error);
    res.status(500).json({ error: 'An error occurred while getting the bill' });
  }
};



exports.updateBill = async (req, res, next) => {
  try {
    const billID = req.params.id;
    const { PatientID, TotalAmount, PaymentStatus, BillDate } = req.body;
    
    // Format the date to 'YYYY-MM-DD'
    const formattedBillDate = new Date(BillDate).toISOString().split('T')[0];

    connection.query('UPDATE Billing SET PatientID=?, TotalAmount=?, PaymentStatus=?, BillDate=? WHERE BillID=?', [PatientID, TotalAmount, PaymentStatus, formattedBillDate, billID], (err, result) => {
      if (err) {
        console.error('Error updating bill:', err);
        res.status(500).json({ error: 'An error occurred while updating the bill' });
        return;
      }
      res.json({ message: 'Bill updated successfully' });
    });
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ error: 'An error occurred while updating the bill' });
  }
};


exports.deleteBill = async (req, res, next) => {
  try {
    const billID = req.params.id;
    connection.query('DELETE FROM Billing WHERE BillID = ?', [billID], (err, result) => {
      if (err) {
        console.error('Error deleting bill:', err);
        res.status(500).json({ error: 'An error occurred while deleting the bill' });
        return;
      }
      res.json({ message: 'Bill deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(500).json({ error: 'An error occurred while deleting the bill' });
  }
};
