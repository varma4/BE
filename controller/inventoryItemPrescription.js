const connection = require('../server');


exports.createInventoryItemPrescription = async (req, res, next) => {
  try {
    const { ItemID, PrescriptionID } = req.body;
    connection.query(
      'INSERT INTO InventoryItem_prescription (ItemID, PrescriptionID) VALUES (?, ?)',
      [ItemID, PrescriptionID],
      (err, result) => {
        if (err) {
          console.error('Error creating inventory item-prescription association:', err);
          res.status(500).json({ error: 'An error occurred while creating the association' });
          return;
        }
        res.status(201).json({ message: 'Association created successfully' });
      }
    );
  } catch (error) {
    console.error('Error creating inventory item-prescription association:', error);
    res.status(500).json({ error: 'An error occurred while creating the association' });
  }
};

// Get all associations between inventory items and prescriptions
exports.getAllInventoryItemPrescriptions = async (req, res, next) => {
  try {
    connection.query('SELECT * FROM InventoryItem_prescription', (err, results) => {
      if (err) {
        console.error('Error getting inventory item-prescription associations:', err);
        res.status(500).json({ error: 'An error occurred while getting associations' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error getting inventory item-prescription associations:', error);
    res.status(500).json({ error: 'An error occurred while getting associations' });
  }
};

// Get association by ID
exports.getInventoryItemPrescriptionById = async (req, res, next) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM InventoryItem_prescription WHERE ID = ?', [id], (err, result) => {
      if (err) {
        console.error('Error getting inventory item-prescription association:', err);
        res.status(500).json({ error: 'An error occurred while getting the association' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Association not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting inventory item-prescription association:', error);
    res.status(500).json({ error: 'An error occurred while getting the association' });
  }
};

// Update association by ID
exports.updateInventoryItemPrescription = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { ItemID, PrescriptionID } = req.body;
    connection.query('UPDATE InventoryItem_prescription SET ItemID=?, PrescriptionID=? WHERE ID=?', [ItemID, PrescriptionID, id], (err, result) => {
      if (err) {
        console.error('Error updating inventory item-prescription association:', err);
        res.status(500).json({ error: 'An error occurred while updating the association' });
        return;
      }
      res.json({ message: 'Association updated successfully' });
    });
  } catch (error) {
    console.error('Error updating inventory item-prescription association:', error);
    res.status(500).json({ error: 'An error occurred while updating the association' });
  }
};

// Delete association by ID
exports.deleteInventoryItemPrescription = async (req, res, next) => {
  try {
    const id = req.params.id;
    connection.query('DELETE FROM InventoryItem_prescription WHERE ID = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting inventory item-prescription association:', err);
        res.status(500).json({ error: 'An error occurred while deleting the association' });
        return;
      }
      res.json({ message: 'Association deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting inventory item-prescription association:', error);
    res.status(500).json({ error: 'An error occurred while deleting the association' });
  }
};
