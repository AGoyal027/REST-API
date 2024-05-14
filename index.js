const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

app.get('/', (req, res) => {
    res.send('Connecting mongoDB to Nodejs Server');
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'Success',
            data: users
        })
    } catch (error) {
        res.json({
            status: 'Failed',
            message: 'Something went wrong'
        })
    }
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Server is running :)'))
        .catch((error) => console.log(error))
})