const connection = require("../server");

exports.createDepartment = async (req, res, next) => {
  try {
    const { HeadDoctorID, Description, Name } = req.body;
    connection.query(
      "INSERT INTO Department (HeadDoctorID, Description, Name) VALUES (?, ?, ?)",
      [HeadDoctorID, Description, Name],
      (err, result) => {
        if (err) {
          console.error("Error adding department:", err);
          res.status(500).json({ error: "An error occurred while adding the department" });
          return;
        }
        res.status(201).json({ message: "Department added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "An error occurred while creating the department" });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Department", (err, results) => {
      if (err) {
        console.error("Error getting departments:", err);
        res.status(500).json({ error: "An error occurred while getting departments" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting departments:", error);
    res.status(500).json({ error: "An error occurred while getting departments" });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res, next) => {
  try {
    const departmentID = req.params.id;
    connection.query('SELECT * FROM Department WHERE DepartmentID = ?', [departmentID], (err, result) => {
      if (err) {
        console.error('Error getting department:', err);
        res.status(500).json({ error: 'An error occurred while getting the department' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Department not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting department:', error);
    res.status(500).json({ error: 'An error occurred while getting the department' });
  }
};

// Update department by ID
exports.updateDepartment = async (req, res, next) => {
  try {
    const departmentID = req.params.id;
    const { HeadDoctorID, Description, Name } = req.body;
    connection.query('UPDATE Department SET HeadDoctorID=?, Description=?, Name=? WHERE DepartmentID=?', [HeadDoctorID, Description, Name, departmentID], (err, result) => {
      if (err) {
        console.error('Error updating department:', err);
        res.status(500).json({ error: 'An error occurred while updating the department' });
        return;
      }
      res.json({ message: 'Department updated successfully' });
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'An error occurred while updating the department' });
  }
};

// Delete department by ID
exports.deleteDepartment = async (req, res, next) => {
  try {
    const departmentID = req.params.id;
    connection.query('DELETE FROM Department WHERE DepartmentID = ?', [departmentID], (err, result) => {
      if (err) {
        console.error('Error deleting department:', err);
        res.status(500).json({ error: 'An error occurred while deleting the department' });
        return;
      }
      res.json({ message: 'Department deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'An error occurred while deleting the department' });
  }
};
