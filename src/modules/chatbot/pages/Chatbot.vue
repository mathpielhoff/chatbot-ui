<template>
    <div class="page-container">
      <header class="page-header">
        <h1>Chatbot</h1>
      </header>
      <main class="page-content">
        <div class="chat-container">
          <!-- DataView pour afficher les messages -->
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="chat-message"
              :class="message.from"
              :style="getMessageStyle(message)"
            >
              <p>{{ message.text }}</p>
            </div>
          </div>
          <!-- Zone d'entrée utilisateur -->
          <div class="chat-input">
            <textarea
              v-model="userInput"
              placeholder="Posez une question..."
              @input="autoResize"
              @keyup.enter="sendMessage"
              rows="3"
            ></textarea>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [
          { from: "bot", text: "Bonjour ! Comment puis-je vous aider ?" },
        ],
        userInput: "",
      };
    },
    methods: {
      sendMessage() {
        if (this.userInput.trim() === "") return;
  
        // Ajouter le message de l'utilisateur
        this.messages.push({ from: "user", text: this.userInput });
  
        // Ajouter une réponse factice du bot
        setTimeout(() => {
          this.messages.push({
            from: "bot",
            text: "Merci pour votre question, je vous répondrai bientôt !",
          });
        }, 500); // Simule un délai pour la réponse du bot
  
        // Réinitialiser la zone de texte
        this.userInput = "";
      },
      autoResize(event) {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      },
      getMessageStyle(message) {
        return {
          backgroundColor: message.from === "user" ? "#d4f8d4" : "#f1f1f1",
          borderRadius: "10px",
          padding: "10px",
          marginBottom: "10px",
          maxWidth: "80%",
          alignSelf: message.from === "user" ? "flex-end" : "flex-start",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    border-radius: 5%;
    overflow: hidden;
    width: 100%;
    padding: 10px;
  }
  
  .chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
  }
  
  .chat-message {
    margin-bottom: 10px;
    word-wrap: break-word;
  }
  
  .chat-message.bot {
    align-self: flex-start;
    color: #333;
  }
  
  .chat-message.user {
    align-self: flex-end;
    text-align: right;
    color: #28a745;
  }
  
  .chat-input {
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
  }
  
  textarea {
    width: 100%;
    height: auto;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    box-sizing: border-box;
  }
  </style>
  