const env = require("dotenv").config();
if (env.error) throw env.error;
const express = require("express");
const morgan = require('morgan');
const db = require('./models')
const app = express();

app.use(morgan('dev'));

app.use('/api/v1', require('./routes'));

const server = app.listen(process.env.PORT || 5000, _ => console.log(`Server started at ${server.address().address}:${server.address().port}`))

