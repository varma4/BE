const connection = require("../server");

exports.createTest = async (req, res, next) => {
  try {
    const { Name, Cost, Description } = req.body;
    connection.query(
      "INSERT INTO Test (Name, Cost, Description) VALUES (?, ?, ?)",
      [Name, Cost, Description],
      (err, result) => {
        if (err) {
          console.error("Error creating test:", err);
          res.status(500).json({ error: "An error occurred while creating the test" });
          return;
        }
        res.status(201).json({ message: "Test created successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "An error occurred while creating the test" });
  }
};

exports.getAllTests = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Test", (err, results) => {
      if (err) {
        console.error("Error getting tests:", err);
        res.status(500).json({ error: "An error occurred while getting tests" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting tests:", error);
    res.status(500).json({ error: "An error occurred while getting tests" });
  }
};

exports.getTestById = async (req, res, next) => {
  try {
    const testID = req.params.id;
    connection.query('SELECT * FROM Test WHERE TestID = ?', [testID], (err, result) => {
      if (err) {
        console.error('Error getting test:', err);
        res.status(500).json({ error: 'An error occurred while getting the test' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Test not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting test:', error);
    res.status(500).json({ error: 'An error occurred while getting the test' });
  }
};

exports.updateTest = async (req, res, next) => {
  try {
    const testID = req.params.id;
    const { Name, Cost, Description } = req.body;
    connection.query('UPDATE Test SET Name=?, Cost=?, Description=? WHERE TestID=?', [Name, Cost, Description, testID], (err, result) => {
      if (err) {
        console.error('Error updating test:', err);
        res.status(500).json({ error: 'An error occurred while updating the test' });
        return;
      }
      res.json({ message: 'Test updated successfully' });
    });
  } catch (error) {
    console.error('Error updating test:', error);
    res.status(500).json({ error: 'An error occurred while updating the test' });
  }
};

exports.deleteTest = async (req, res, next) => {
  try {
    const testID = req.params.id;
    connection.query('DELETE FROM Test WHERE TestID = ?', [testID], (err, result) => {
      if (err) {
        console.error('Error deleting test:', err);
        res.status(500).json({ error: 'An error occurred while deleting the test' });
        return;
      }
      res.json({ message: 'Test deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ error: 'An error occurred while deleting the test' });
  }
};
