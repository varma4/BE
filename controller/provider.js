const connection = require("../server");

// Create a new provider
exports.createProvider = async (req, res, next) => {
  try {
    const { Name, Phone, Email, Address } = req.body;
    connection.query(
      "INSERT INTO Provider (Name, Phone, Email, Address) VALUES (?, ?, ?, ?)",
      [Name, Phone, Email, Address],
      (err, result) => {
        if (err) {
          console.error("Error adding provider:", err);
          res.status(500).json({ error: "An error occurred while adding the provider" });
          return;
        }
        res.status(201).json({ message: "Provider added successfully" });
      }
    );
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ error: "An error occurred while creating the provider" });
  }
};

// Get all providers
exports.getAllProviders = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM Provider", (err, results) => {
      if (err) {
        console.error("Error getting providers:", err);
        res.status(500).json({ error: "An error occurred while getting providers" });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting providers:", error);
    res.status(500).json({ error: "An error occurred while getting providers" });
  }
};

// Get provider by ID
exports.getProviderById = async (req, res, next) => {
  try {
    const providerID = req.params.id;
    connection.query('SELECT * FROM Provider WHERE ProviderID = ?', [providerID], (err, result) => {
      if (err) {
        console.error('Error getting provider:', err);
        res.status(500).json({ error: 'An error occurred while getting the provider' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Provider not found' });
        return;
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error getting provider:', error);
    res.status(500).json({ error: 'An error occurred while getting the provider' });
  }
};

// Update provider by ID
exports.updateProvider = async (req, res, next) => {
  try {
    const providerID = req.params.id;
    const { Name, Phone, Email, Address } = req.body;
    connection.query('UPDATE Provider SET Name=?, Phone=?, Email=?, Address=? WHERE ProviderID=?', [Name, Phone, Email, Address, providerID], (err, result) => {
      if (err) {
        console.error('Error updating provider:', err);
        res.status(500).json({ error: 'An error occurred while updating the provider' });
        return;
      }
      res.json({ message: 'Provider updated successfully' });
    });
  } catch (error) {
    console.error('Error updating provider:', error);
    res.status(500).json({ error: 'An error occurred while updating the provider' });
  }
};

// Delete provider by ID
exports.deleteProvider = async (req, res, next) => {
  try {
    const providerID = req.params.id;
    connection.query('DELETE FROM Provider WHERE ProviderID = ?', [providerID], (err, result) => {
      if (err) {
        console.error('Error deleting provider:', err);
        res.status(500).json({ error: 'An error occurred while deleting the provider' });
        return;
      }
      res.json({ message: 'Provider deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ error: 'An error occurred while deleting the provider' });
  }
};
