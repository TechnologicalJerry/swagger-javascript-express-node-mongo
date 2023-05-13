const express = require('express');

const mongoose = require('mongoose');

const app = express();

const port = 3000;

require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
    console.log(`NodeJs Server running on PORT: ${port}`);
})

const users = ['jerry', 'bill', 'mark'];

app.get('/users', (req, res) => {
    console.log('Hello, Welcome to nodeJs API!');
    console.log('API Health is OKAY!');
    res.status(200).send(users);
})

