const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
require('dotenv').config(); 

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const booksRouter = require('./routes/bookRouter');

app.use('/api', booksRouter);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
