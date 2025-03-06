let chatHistory = [];

// Function to add message to the chat display
function updateChat(message) {
    const chatOutput = document.getElementById("chat-output");
    const newMessage = document.createElement("div");
    newMessage.textContent = message;
    chatOutput.appendChild(newMessage);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Auto scroll to bottom
    chatHistory.push(message); // Save message in history
}

// Function to save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    alert("Chat history saved!");
}

// Send message when clicking the "Send" button or pressing Enter
document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    if (input.value.trim()) {
        updateChat(input.value);
        input.value = ''; // Clear the input field
    }
});

// Save chat history when clicking the "Save Chat" button
document.getElementById("save-button").addEventListener("click", () => {
    saveChatHistory();
});

// Load chat history from localStorage on page load
window.onload = function() {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
        chatHistory.forEach(message => {
            updateChat(message);
        });
    }
};
