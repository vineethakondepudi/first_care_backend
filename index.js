const express = require('express');
const cors = require('cors');
const registrationRoute = require('./routing/router');

// Import MongoDB connection
require('./db/server');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', registrationRoute);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



