const express = require('express');
const mongoose = require('mongoose');
const app = express();
// Define Mongoose schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Create Mongoose model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Meanstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define route to create a new user
app.post('/users', async (req, res) => {
    try {
        // Check if the name and email fields are present in the request body
        if (!req.body.name || !req.body.email) {
            // If either field is missing, return a 400 Bad Request response with an error message
            return res.status(400).json({ error: 'Name and email are required fields' });
        }

        // Create a new user document with name and email from request body
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        // Save the new user document to the database
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Start the server
app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
