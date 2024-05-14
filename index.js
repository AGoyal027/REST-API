const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Connecting mongoDB to Nodejs Server');
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Server is running :)'))
        .catch((error) => console.log(error))
})