const connection = require("../server");

exports.createPayment = async (req, res, next) => {
  try {
    const { BillID, PaymentCode, PaymentMethod, PaymentAmount } = req.body;
    console.log("Received BillID:", BillID); // Log the received BillID
    connection.query(
      "INSERT INTO Payment (BillID, PaymentCode, PaymentMethod, PaymentAmount) VALUES (?, ?, ?, ?)",
      [BillID, PaymentCode, PaymentMethod, PaymentAmount],
      (err, result) => {
        if (err) {
          console.error("Error creating payment:", err);
          res.status(500).json({ error: "An error occurred while creating the payment" });
          return;
        }
        // Payment inserted successfully, now update the payment status to "paid"
        connection.query(
          "UPDATE billing SET PaymentStatus = 'paid' WHERE BillID = ?",
          [BillID],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating payment status:", updateErr);
              // Don't block the response if updating payment status fails
            }
            res.status(201).json({ message: "Payment created successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "An error occurred while creating the payment" });
  }
};



exports.getAllPayments = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Payment", (err, results) => {
      if (err) {
        console.error("Error getting payments:", err);
        res.status(500).json({ error: "An error occurred while getting payments" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting payments:", error);
    res.status(500).json({ error: "An error occurred while getting payments" });
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const paymentID = req.params.id;
    connection.query('SELECT * FROM Payment WHERE PaymentID = ?', [paymentID], (err, result) => {
      if (err) {
        console.error('Error getting payment:', err);
        res.status(500).json({ error: 'An error occurred while getting the payment' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Payment not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting payment:', error);
    res.status(500).json({ error: 'An error occurred while getting the payment' });
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const paymentID = req.params.id;
    const { BillID, PaymentCode, PaymentMethod, PaymentAmount } = req.body;
    connection.query('UPDATE Payment SET BillID=?, PaymentCode=?, PaymentMethod=?, PaymentAmount=? WHERE PaymentID=?', [BillID, PaymentCode, PaymentMethod, PaymentAmount, paymentID], (err, result) => {
      if (err) {
        console.error('Error updating payment:', err);
        res.status(500).json({ error: 'An error occurred while updating the payment' });
        return;
      }
      res.json({ message: 'Payment updated successfully' });
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'An error occurred while updating the payment' });
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const paymentID = req.params.id;
    connection.query('DELETE FROM Payment WHERE PaymentID = ?', [paymentID], (err, result) => {
      if (err) {
        console.error('Error deleting payment:', err);
        res.status(500).json({ error: 'An error occurred while deleting the payment' });
        return;
      }
      res.json({ message: 'Payment deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the payment' });
  }
};
