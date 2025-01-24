const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const leaderboard = [];


// Routes
// POST route to add a name and score to the leaderboard
app.post('/post', (req, res) => {
    try {
        const { name, score } = req.body;
        if (!name || typeof score !== 'number') {
            return res.status(400).send('Invalid name or score');
        }
        leaderboard.push({ name, score });
        res.status(201).send({ message: 'Entry added to leaderboard', leaderboard });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET route to retrieve the leaderboard
app.get('/leaderboard', (req, res) => {
    try {
        res.status(200).send(leaderboard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App running on port: ' + PORT);
});
