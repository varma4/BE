const connection = require("../server");

exports.createRoom = async (req, res, next) => {
  try {
    const { RoomNumber, RoomType, Availability } = req.body;
    connection.query(
      "INSERT INTO Room (RoomNumber, RoomType, Availability) VALUES (?, ?, ?)",
      [RoomNumber, RoomType, Availability],
      (err, result) => {
        if (err) {
          console.error("Error adding room:", err);
          res.status(500).json({ error: "An error occurred while adding the room" });
          return;
        }
        res.status(201).json({ message: "Room added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "An error occurred while creating the room" });
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Room", (err, results) => {
      if (err) {
        console.error("Error getting rooms:", err);
        res.status(500).json({ error: "An error occurred while getting rooms" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting rooms:", error);
    res.status(500).json({ error: "An error occurred while getting rooms" });
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const roomID = req.params.id;
    connection.query('SELECT * FROM Room WHERE RoomID = ?', [roomID], (err, result) => {
      if (err) {
        console.error('Error getting room:', err);
        res.status(500).json({ error: 'An error occurred while getting the room' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting room:', error);
    res.status(500).json({ error: 'An error occurred while getting the room' });
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const roomID = req.params.id;
    const { RoomNumber, RoomType, Availability } = req.body;
    connection.query('UPDATE Room SET RoomNumber=?, RoomType=?, Availability=? WHERE RoomID=?', [RoomNumber, RoomType, Availability, roomID], (err, result) => {
      if (err) {
        console.error('Error updating room:', err);
        res.status(500).json({ error: 'An error occurred while updating the room' });
        return;
      }
      res.json({ message: 'Room updated successfully' });
    });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'An error occurred while updating the room' });
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const roomID = req.params.id;
    connection.query('DELETE FROM Room WHERE RoomID = ?', [roomID], (err, result) => {
      if (err) {
        console.error('Error deleting room:', err);
        res.status(500).json({ error: 'An error occurred while deleting the room' });
        return;
      }
      res.json({ message: 'Room deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'An error occurred while deleting the room' });
  }
};
