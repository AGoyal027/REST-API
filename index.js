const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded());

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

app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body
        await User.create({ firstName, lastName, email, phone })
        res.json({
            status: 'Success',
            message: 'User created successfully'
        })
    } catch (error) {
        res.json({
            status: 'Failed',
            message: 'Something went wrong'
        })
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone } = req.body
        await User.findByIdAndUpdate(id, { firstName, lastName, email, phone })
        res.json({
            status: 'Success',
            message: 'User updated successfully'
        })
    } catch (error) {
        res.json({
            status: 'Failed',
            message: 'Something went wrong'
        })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id)
        res.json({
            status: 'Success',
            message: 'User deleted successfully'
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