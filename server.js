const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = {}; // Mock database for demo purposes

// Endpoint to register a user and generate a referral code
app.post('/register', (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Generate a unique referral code (e.g., USER123)
    const referralCode = `USER${Math.floor(1000 + Math.random() * 9000)}`;

    // Store the user and referral code in the mock database
    users[username] = { username, referralCode };
    console.log(`User registered: ${username}, Referral Code: ${referralCode}`);

    // Respond with the generated referral link
    res.json({
        referralLink: `https://your-app.com/register?referral=${referralCode}`,
    });
});

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

