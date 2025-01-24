const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'https://your-frontend-url.com' })); // Update this to your actual frontend URL

// Correct answer (hidden from users)
const correctAnswer = process.env.CORRECT_ANSWER || "echo";

// Endpoint to validate user answers
app.post('/validate-answer', (req, res) => {
    const userAnswer = req.body.answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false, message: "Incorrect answer. Try again." });
    }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

