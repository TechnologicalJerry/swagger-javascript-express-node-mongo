const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Welcome to nodeJs API');
})

app.listen(port, () => {
    console.log(`NodeJs Server running on PORT: ${port}`);
})