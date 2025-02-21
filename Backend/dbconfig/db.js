const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nikhilhmane49:nikhil%40123@cluster0.ggws3.mongodb.net/');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectDB;
