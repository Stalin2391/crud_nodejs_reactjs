const express = require('express');
const productRoute = require('./routes/product');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//routes
app.use('/product', productRoute);

module.exports = app;