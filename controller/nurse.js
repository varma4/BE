const connection = require("../server");

exports.createNurse = async (req, res, next) => {
  try {
    const { Department, Name, Email, Scheduling } = req.body;
    connection.query(
      "INSERT INTO Nurse (Department, Name, Email, Scheduling) VALUES (?, ?, ?, ?)",
      [Department, Name, Email, Scheduling],
      (err, result) => {
        if (err) {
          console.error("Error adding nurse:", err);
          res
            .status(500)
            .json({ error: "An error occurred while adding the nurse" });
          return;
        }
        res.status(201).json({ message: "Nurse added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating nurse:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the nurse" });
  }
};

exports.getAllNurses = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Nurse", (err, results) => {
      if (err) {
        console.error("Error getting nurses:", err);
        res
          .status(500)
          .json({ error: "An error occurred while getting nurses" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting nurses:", error);
    res.status(500).json({ error: "An error occurred while getting nurses" });
  }
};

exports.getNurseById = async (req, res, next) => {
  try {
    const nurseID = req.params.id;
    connection.query(
      "SELECT * FROM Nurse WHERE NurseID = ?",
      [nurseID],
      (err, result) => {
        if (err) {
          console.error("Error getting nurse:", err);
          res
            .status(500)
            .json({ error: "An error occurred while getting the nurse" });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ error: "Nurse not found" });
          return;
        }
        res.json(result[0]);
      }
    );
  } catch (error) {
    console.error("Error getting nurse:", error);
    res.status(500).json({ error: "An error occurred while getting the nurse" });
  }
};

exports.updateNurseById = async (req, res, next) => {
  try {
    const nurseID = req.params.id;
    const { Department, Name, Email, Scheduling } = req.body;
    connection.query(
      "UPDATE Nurse SET Department=?, Name=?, Email=?, Scheduling=? WHERE NurseID=?",
      [Department, Name, Email, Scheduling, nurseID],
      (err, result) => {
        if (err) {
          console.error("Error updating nurse:", err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the nurse" });
          return;
        }
        res.json({ message: "Nurse updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating nurse:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the nurse" });
  }
};

exports.deleteNurseById = async (req, res, next) => {
  try {
    const nurseID = req.params.id;
    connection.query(
      "DELETE FROM Nurse WHERE NurseID = ?",
      [nurseID],
      (err, result) => {
        if (err) {
          console.error("Error deleting nurse:", err);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the nurse" });
          return;
        }
        res.json({ message: "Nurse deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting nurse:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the nurse" });
  }
};
