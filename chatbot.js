// Add this script to your project

document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotBox = document.getElementById('chatbot-box');
  const closeChat = document.getElementById('close-chat');
  const userInput = document.getElementById('user-input');
  const sendMessage = document.getElementById('send-message');
  const chatMessages = document.getElementById('chat-messages');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', function() {
    chatbotBox.classList.add('active');
    chatbotBox.style.display = 'flex';
  });

  // Close chatbot
  closeChat.addEventListener('click', function() {
    chatbotBox.classList.remove('active');
    chatbotBox.style.display = 'none';
  });

  // Send message function
  function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, false);
    userInput.value = '';

    // Send message to API and get response
    fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
      // Add bot response to chat
      addMessage(data.response, true);
    })
    .catch(error => {
      console.error('Error:', error);
      addMessage("Sorry, I couldn't process your request. Please try again.", true);
    });
  }

  // Add message to chat
  function addMessage(text, isBot) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isBot ? 'bot-message' : 'user-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message on button click
  sendMessage.addEventListener('click', handleSendMessage);

  // Send message on Enter key
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
});