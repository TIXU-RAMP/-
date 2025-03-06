let chatHistory = [];

// Function to update the chat with the user's and bot's messages
function updateChat(message, sender) {
    const chatOutput = document.getElementById("chat-output");
    const newMessage = document.createElement("div");
    newMessage.textContent = `${sender}: ${message}`;
    chatOutput.appendChild(newMessage);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the latest message
    chatHistory.push({ sender: sender, message: message }); // Save message in history
}

// Function to simulate bot response
function botResponse(userMessage) {
    // Example response logic
    if (userMessage.includes("hello")) {
        return "Hi there! How can I help you today?";
    } else if (userMessage.includes("how are you")) {
        return "I'm doing great, thank you!";
    } else {
        return "I'm not sure how to respond to that. Can you ask something else?";
    }
}

// Send message when clicking the "Send" button or pressing Enter
document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    const userMessage = input.value.trim();
    if (userMessage) {
        updateChat(userMessage, "You");
        const botMessage = botResponse(userMessage);
        updateChat(botMessage, "Bot");
        input.value = ''; // Clear the input field
    }
});

// Save chat history to localStorage
document.getElementById("save-button").addEventListener("click", () => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    alert("Chat history saved!");
});

// Load chat history from localStorage on page load
window.onload = function() {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
        chatHistory.forEach(chat => {
            updateChat(chat.message, chat.sender);
        });
    }
};
