const serverUrl = "https://blackbeard-treasure-hunt.onrender.com"; // Backend URL

async function validateAnswer() {
    const userAnswer = document.getElementById("userAnswer").value.trim();
    const remainingGuessesElement = document.getElementById("remainingGuesses");

    try {
        const response = await fetch(`${serverUrl}/validate-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: userAnswer })
        });

        const result = await response.json();

        if (result.correct) {
            document.getElementById("celebration").style.display = "block";
            showPopup("Congratulations! You solved the riddle!");
        } else {
            showPopup(result.message || "Incorrect answer. Try again.");
        }
    } catch (error) {
        console.error("Error validating answer:", error);
        showPopup("An error occurred. Please try again later.");
    }

    document.getElementById("userAnswer").value = ""; // Clear the input box
}

function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
}
        }
    } catch (error) {
        console.error("Error validating answer:", error);
        showPopup("An error occurred. Please try again later.");
    }

    document.getElementById("userAnswer").value = ""; // Clear the input box
}

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
