const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'https://blackbeardworld.golden.computer' })); // Update this to your actual frontend URL

// Correct answer (hidden from users)
const correctAnswer = process.env.CORRECT_ANSWER || "echo";

app.post('/referrals', (req, res) => {
    const { referralCode } = req.body;

    if (!referralCode) {
        return res.status(400).json({ message: 'Referral code is required' });
    }

    // Logic to store and link the referral
    console.log(`Referral received for code: ${referralCode}`);
    // Example: Increment referral count for the user with this code

    res.status(200).json({ message: 'Referral tracked successfully' });
});


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

