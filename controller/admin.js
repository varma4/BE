const connection = require("../server");

exports.createAdminStaff = async (req, res, next) => {
  try {
    const { Role, Email, Department, Name } = req.body;
    connection.query(
      "INSERT INTO AdministrativeStaff (Role, Email, Department, Name) VALUES (?, ?, ?, ?)",
      [Role, Email, Department, Name],
      (err, result) => {
        if (err) {
          console.error("Error adding administrative staff:", err);
          res.status(500).json({ error: "An error occurred while adding the administrative staff" });
          return;
        }
        res.status(201).json({ message: "Administrative staff added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating administrative staff:", error);
    res.status(500).json({ error: "An error occurred while creating the administrative staff" });
  }
};

// Get all administrative staff
exports.getAllAdminStaff = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM AdministrativeStaff", (err, results) => {
      if (err) {
        console.error("Error getting administrative staff:", err);
        res.status(500).json({ error: "An error occurred while getting administrative staff" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting administrative staff:", error);
    res.status(500).json({ error: "An error occurred while getting administrative staff" });
  }
};

// Get administrative staff by ID
exports.getAdminStaffById = async (req, res, next) => {
  try {
    const staffID = req.params.id;
    connection.query('SELECT * FROM AdministrativeStaff WHERE StaffID = ?', [staffID], (err, result) => {
      if (err) {
        console.error('Error getting administrative staff:', err);
        res.status(500).json({ error: 'An error occurred while getting the administrative staff' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Administrative staff not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting administrative staff:', error);
    res.status(500).json({ error: 'An error occurred while getting the administrative staff' });
  }
};

// Update administrative staff by ID
exports.updateAdminStaff = async (req, res, next) => {
  try {
    const staffID = req.params.id;
    const { Role, Email, Department, Name } = req.body;
    connection.query('UPDATE AdministrativeStaff SET Role=?, Email=?, Department=?, Name=? WHERE StaffID=?', [Role, Email, Department, Name, staffID], (err, result) => {
      if (err) {
        console.error('Error updating administrative staff:', err);
        res.status(500).json({ error: 'An error occurred while updating the administrative staff' });
        return;
      }
      res.json({ message: 'Administrative staff updated successfully' });
    });
  } catch (error) {
    console.error('Error updating administrative staff:', error);
    res.status(500).json({ error: 'An error occurred while updating the administrative staff' });
  }
};

// Delete administrative staff by ID
exports.deleteAdminStaff = async (req, res, next) => {
  try {
    const staffID = req.params.id;
    connection.query('DELETE FROM AdministrativeStaff WHERE StaffID = ?', [staffID], (err, result) => {
      if (err) {
        console.error('Error deleting administrative staff:', err);
        res.status(500).json({ error: 'An error occurred while deleting the administrative staff' });
        return;
      }
      res.json({ message: 'Administrative staff deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting administrative staff:', error);
    res.status(500).json({ error: 'An error occurred while deleting the administrative staff' });
  }
};
