const connection = require("../server");

// Create a new inventory item
exports.createInventoryItem = async (req, res, next) => {
  try {
    const { SupplierID, Name, Description, Quantity, ExpirationDate } = req.body;
    connection.query(
      "INSERT INTO InventoryItem (SupplierID, Name, Description, Quantity, ExpirationDate) VALUES (?, ?, ?, ?, ?)",
      [SupplierID, Name, Description, Quantity, ExpirationDate],
      (err, result) => {
        if (err) {
          console.error("Error adding inventory item:", err);
          res.status(500).json({ error: "An error occurred while adding the inventory item" });
          return;
        }
        res.status(201).json({ message: "Inventory item added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating inventory item:", error);
    res.status(500).json({ error: "An error occurred while creating the inventory item" });
  }
};

// Get all inventory items
exports.getAllInventoryItems = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM InventoryItem", (err, results) => {
      if (err) {
        console.error("Error getting inventory items:", err);
        res.status(500).json({ error: "An error occurred while getting inventory items" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting inventory items:", error);
    res.status(500).json({ error: "An error occurred while getting inventory items" });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res, next) => {
  try {
    const itemID = req.params.id;
    connection.query('SELECT * FROM InventoryItem WHERE ItemID = ?', [itemID], (err, result) => {
      if (err) {
        console.error('Error getting inventory item:', err);
        res.status(500).json({ error: 'An error occurred while getting the inventory item' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Inventory item not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting inventory item:', error);
    res.status(500).json({ error: 'An error occurred while getting the inventory item' });
  }
};

exports.updateInventoryItem = async (req, res, next) => {
  try {
    const itemID = req.params.id;
    let { SupplierID, Name, Description, Quantity, ExpirationDate } = req.body;

    // Extracting only the date part from the given ISO string
    ExpirationDate = new Date(ExpirationDate).toISOString().split('T')[0];

    connection.query('UPDATE InventoryItem SET SupplierID=?, Name=?, Description=?, Quantity=?, ExpirationDate=? WHERE ItemID=?', [SupplierID, Name, Description, Quantity, ExpirationDate, itemID], (err, result) => {
      if (err) {
        console.error('Error updating inventory item:', err);
        res.status(500).json({ error: 'An error occurred while updating the inventory item' });
        return;
      }
      res.json({ message: 'Inventory item updated successfully' });
    });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'An error occurred while updating the inventory item' });
  }
};


// Delete inventory item by ID
exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const itemID = req.params.id;
    connection.query('DELETE FROM InventoryItem WHERE ItemID = ?', [itemID], (err, result) => {
      if (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'An error occurred while deleting the inventory item' });
        return;
      }
      res.json({ message: 'Inventory item deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the inventory item' });
  }
};
