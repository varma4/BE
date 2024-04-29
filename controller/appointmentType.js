const connection = require("../server");

exports.createAppointmentType = async (req, res, next) => {
  try {
    const { TypeName, Dimensions } = req.body;
    connection.query(
      "INSERT INTO AppointmentType (TypeName, Dimensions) VALUES (?, ?)",
      [TypeName, Dimensions],
      (err, result) => {
        if (err) {
          console.error("Error adding appointment type:", err);
          res.status(500).json({ error: "An error occurred while adding the appointment type" });
          return;
        }
        res.status(201).json({ message: "Appointment type added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating appointment type:", error);
    res.status(500).json({ error: "An error occurred while creating the appointment type" });
  }
};

exports.getAllAppointmentTypes = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM AppointmentType", (err, results) => {
      if (err) {
        console.error("Error getting appointment types:", err);
        res.status(500).json({ error: "An error occurred while getting appointment types" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting appointment types:", error);
    res.status(500).json({ error: "An error occurred while getting appointment types" });
  }
};

exports.getAppointmentTypeById = async (req, res, next) => {
  try {
    const typeID = req.params.id;
    connection.query('SELECT * FROM AppointmentType WHERE TypeID = ?', [typeID], (err, result) => {
      if (err) {
        console.error('Error getting appointment type:', err);
        res.status(500).json({ error: 'An error occurred while getting the appointment type' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Appointment type not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting appointment type:', error);
    res.status(500).json({ error: 'An error occurred while getting the appointment type' });
  }
};

exports.updateAppointmentType = async (req, res, next) => {
  try {
    const typeID = req.params.id;
    const { TypeName, Dimensions } = req.body;
    connection.query('UPDATE AppointmentType SET TypeName=?, Dimensions=? WHERE TypeID=?', [TypeName, Dimensions, typeID], (err, result) => {
      if (err) {
        console.error('Error updating appointment type:', err);
        res.status(500).json({ error: 'An error occurred while updating the appointment type' });
        return;
      }
      res.json({ message: 'Appointment type updated successfully' });
    });
  } catch (error) {
    console.error('Error updating appointment type:', error);
    res.status(500).json({ error: 'An error occurred while updating the appointment type' });
  }
};

exports.deleteAppointmentType = async (req, res, next) => {
  try {
    const typeID = req.params.id;
    connection.query('DELETE FROM AppointmentType WHERE TypeID = ?', [typeID], (err, result) => {
      if (err) {
        console.error('Error deleting appointment type:', err);
        res.status(500).json({ error: 'An error occurred while deleting the appointment type' });
        return;
      }
      res.json({ message: 'Appointment type deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting appointment type:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment type' });
  }
};
