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

// Function to get a response from OpenAI's API
async function botResponse(userMessage) {
    const apiKey = "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"; // Replace with your OpenAI API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini", // You can use "gpt-4" if you have access
            messages: [{ role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I couldn't generate a response.";
}

// Send message when clicking the "Send" button or pressing Enter
document.getElementById("send-button").addEventListener("click", async () => {
    const input = document.getElementById("chat-input");
    const userMessage = input.value.trim();
    if (userMessage) {
        updateChat(userMessage, "You");
        const botMessage = await botResponse(userMessage);
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
