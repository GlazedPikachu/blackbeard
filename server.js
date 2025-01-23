const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files from the "public" folder

// Correct answer (hidden from users)
const correctAnswer = "echo";

// Endpoint to validate user answers
app.post('/validate-answer', (req, res) => {
    const userAnswer = req.body.answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
