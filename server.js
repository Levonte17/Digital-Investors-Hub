//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
//INITUALIZE
const app = express();
//CONFIG
require('dotenv').config();
const { PORT = 4000, DATABASE_URL } = process.env;
//CONNECT MONGODB
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected', () => console.log('MONGODB  IS CONNECTED'))
//MIDDLEWARE
//ROUTES
app.get('/', (req, res) => {
res.send('WELCOME TO MY PORTFOLIO');
});
//LISTEN
app.listen(PORT, () => {
console.log(`PORT IS LISTENING ON PORT ${ PORT }`);
});