const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const leaderboard = [];

// Middleware Connections
app.use(cors());
app.use(express.json()); 

// Routes
// POST route to add a name and score to the leaderboard
app.post('/post', (req, res) => {
    try {
        const { name, score } = req.body;
        if (!name || typeof score !== 'number') {
            return res.status(400).json({ error: 'Invalid name or score' });
        }
        leaderboard.push({ name, score });
        res.status(201).json({ message: 'Entry added to leaderboard', leaderboard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to retrieve the leaderboard
app.get('/leaderboard', (req, res) => {
    try {
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App running on port: ' + PORT);
});
