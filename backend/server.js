require('dotenv').config();
const express = require('express')
const app = express();
const connectDB = require('./db/db.js');


const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);
connectDB();


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})