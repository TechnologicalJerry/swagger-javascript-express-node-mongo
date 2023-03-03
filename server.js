const express = require('express');
const mongoDb = require('mongoose');
const app = express();
const port = 3000;
const dBhost = 'mongodb://localhost:27017';

app.get('/', (req, res) => {
    res.send('Hello, Welcome to nodeJs API');
})

app.get('/blog', (req, res) => {
    res.send('This is blog api');
})

mongoDb.connect('mongodb://localhost:27017').then(() => {
    console.log('MongoDb Connected')
}).then((error) => {
    console.log(error)
});

app.listen(port, () => {
    console.log(`NodeJs Server running on PORT: ${port}`);
})