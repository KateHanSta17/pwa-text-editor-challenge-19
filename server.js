const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT provided by Render, default to 3000

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
