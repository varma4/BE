const connection = require("../server");

exports.createAppointment = async (req, res, next) => {
  try {
    const { PatientID, DoctorID, AppointmentDate, AppointmentTime, Status } = req.body;
    connection.query(
      "INSERT INTO Appointment (PatientID, DoctorID, AppointmentDate, AppointmentTime, Status) VALUES (?, ?, ?, ?, ?)",
      [PatientID, DoctorID, AppointmentDate, AppointmentTime, Status],
      (err, result) => {
        if (err) {
          console.error("Error adding appointment:", err);
          res.status(500).json({ error: "An error occurred while adding the appointment" });
          return;
        }
        res.status(201).json({ message: "Appointment added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "An error occurred while creating the appointment" });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res, next) => {
  try {
    connection.query(
      "SELECT A.*, D.Name AS DoctorName, P.Name AS PatientName FROM Appointment A JOIN Doctor D ON A.DoctorID = D.DoctorID JOIN Patient P ON A.PatientID = P.PatientID",
      (err, results) => {
        if (err) {
          console.error("Error getting appointments:", err);
          res.status(500).json({ error: "An error occurred while getting appointments" });
          return;
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ error: "An error occurred while getting appointments" });
  }
};


// Get appointment by ID
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointmentID = req.params.id;
    console.log(req.params.id);
    connection.query('SELECT * FROM Appointment WHERE AppointmentID = ?', [appointmentID], (err, result) => {
      if (err) {
        console.error('Error getting appointment:', err);
        res.status(500).json({ error: 'An error occurred while getting the appointment' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Appointment not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting appointment:', error);
    res.status(500).json({ error: 'An error occurred while getting the appointment' });
  }
};

exports.getAppointmentByPatientId = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    console.log(req.params.patientId);
    connection.query(`
      SELECT 
        A.*, 
        D.Name AS DoctorName,
        P.Name AS PatientName
      FROM 
        Appointment A 
      JOIN 
        Doctor D 
      ON 
        A.DoctorID = D.DoctorID 
      JOIN 
        Patient P
      ON 
        A.PatientID = P.PatientID
      WHERE 
        A.PatientID = ?`, 
      [patientId], 
      (err, result) => {
        if (err) {
          console.error('Error getting appointments by patient ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the appointments' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Appointments for the patient not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting appointments by patient ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the appointments' });
  }
};


exports.getAppointmentByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    console.log(req.params.doctorId);
    connection.query(`
      SELECT 
        A.*, 
        D.Name AS DoctorName,
        P.Name AS PatientName
      FROM 
        Appointment A 
      JOIN 
        Doctor D 
      ON 
        A.DoctorID = D.DoctorID 
      JOIN 
        Patient P
      ON 
        A.PatientID = P.PatientID
      WHERE 
        A.DoctorID = ?`, 
      [doctorId], 
      (err, result) => {
        if (err) {
          console.error('Error getting appointments by doctor ID:', err);
          res.status(500).json({ error: 'An error occurred while getting the appointments' });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: 'Appointments for the doctor not found' });
          return;
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error('Error getting appointments by doctor ID:', error);
    res.status(500).json({ error: 'An error occurred while getting the appointments' });
  }
};




// Update appointment by ID
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointmentID = req.params.id;
    let { PatientID, DoctorID, AppointmentDate, AppointmentTime, Status } = req.body;

    // Extracting only the date part from the given ISO string
    AppointmentDate = new Date(AppointmentDate).toISOString().split('T')[0];

    connection.query('UPDATE Appointment SET PatientID=?, DoctorID=?, AppointmentDate=?, AppointmentTime=?, Status=? WHERE AppointmentID=?', [PatientID, DoctorID, AppointmentDate, AppointmentTime, Status, appointmentID], (err, result) => {
      if (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ error: 'An error occurred while updating the appointment' });
        return;
      }
      res.json({ message: 'Appointment updated successfully' });
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
};


// Delete appointment by ID
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointmentID = req.params.id;
    connection.query('DELETE FROM Appointment WHERE AppointmentID = ?', [appointmentID], (err, result) => {
      if (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'An error occurred while deleting the appointment' });
        return;
      }
      res.json({ message: 'Appointment deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
};
