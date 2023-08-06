const express = require('express');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const path = require('path');

const app = express();

const port = process.env.SERVER_PORT | 3000;

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

app.get('/homePage', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const users = [];

app.get('/users', (req, res) => {
    console.log('Hello, Welcome to nodeJs API!');
    console.log('API Health is OKAY!');
    res.status(200).send(users);
})

app.post('/users', async (req, res) => {
    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: bcryptPassword };
    users.push(user);
    res.status(201).send(users);
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('User Login Success')
        } else {
            res.send('User Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})