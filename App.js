const express = require('express');
require('dotenv').config();
const app = express();
const port =  3000; // Set your desired port

// Middleware and route setup will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
app.use('/api',require('./Routes.js'))