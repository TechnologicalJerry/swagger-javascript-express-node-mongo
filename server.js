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

app.use(express.json());

app.listen(port, () => {
    console.log(`NodeJs Server running on PORT: ${port}`);
})

const users = [];

app.get('/users', (req, res) => {
    console.log('Hello, Welcome to nodeJs API!');
    console.log('API Health is OKAY!');
    res.status(200).send(users);
})

app.post('/users', (req, res) => {
    let postData = req.body
    console.log('POSTDATA::', postData);
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send(users);
})

