const express = require('express');
const mongoDb = require('mongoose');
const app = express();
const port = 3000;
// const mongoString = process.env.DATABASE_URL;

app.get('/', (req, res) => {
    res.send('Hello, Welcome to nodeJs API');
})

app.get('/blog', (req, res) => {
    res.send('This is blog api');
})

mongoDb.connect(`mongodb://localhost:27017`);
const database = mongoDb.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

app.listen(port, () => {
    console.log(`NodeJs Server running on PORT: ${port}`);
});