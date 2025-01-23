const maxGuesses = 10;
let remainingGuesses = maxGuesses;

// Add this at the top of script.js
document.getElementById("userAnswer").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission or behavior
        validateAnswer(); // Call the validateAnswer function
    }
});

function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");

    popupMessage.textContent = message; // Set the popup message
    popup.classList.remove("hidden"); // Show the popup
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden"); // Hide the popup
}

async function validateAnswer() {
    const userAnswer = document.getElementById("userAnswer").value.trim();
    const remainingGuessesElement = document.getElementById("remainingGuesses");

    if (remainingGuesses <= 0) {
        showPopup("No more guesses allowed. Please try again later.");
        return;
    }

    try {
        const response = await fetch('/validate-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: userAnswer })
        });

        const result = await response.json();

        if (result.correct) {
            // Show the confetti animation
            const celebration = document.getElementById("celebration");
            const confettiAnimation = document.getElementById("confettiAnimation");

            celebration.style.display = "block"; // Show the container
            confettiAnimation.play(); // Ensure the animation starts playing

            // Show popup
            showPopup("Congratulations! You solved the riddle!");
        } else {
            remainingGuesses--;
            remainingGuessesElement.textContent = remainingGuesses;

            if (remainingGuesses > 0) {
                showPopup("Incorrect answer. Try again.");
            } else {
                showPopup("You've used all your guesses. Better luck next time!");
            }
        }
    } catch (error) {
        console.error("Error validating answer:", error);
        showPopup("An error occurred. Please try again later.");
    }

    document.getElementById("userAnswer").value = ""; // Clear the input box
}
