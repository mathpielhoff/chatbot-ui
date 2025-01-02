<template>
    <div class="page-container">
      <header class="page-header">
        <h1>Chatbot</h1>
      </header>
      <main class="page-content">
        <div class="chat-container">
          <!-- Messages -->
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="chat-message"
              :class="message.from"
            >
              <!-- Message texte -->
              <template v-if="message.type === 'text'">
                <p>{{ message.text }}</p>
              </template>
  
              <!-- Message avec boutons -->
              <template v-else-if="message.type === 'button'">
                <div>
                  <p>{{ message.text }}</p>
                  <button
                    v-for="(btn, i) in message.buttons"
                    :key="i"
                    class="chat-button"
                    @click="handleButtonClick(btn.action)"
                  >
                    {{ btn.label }}
                  </button>
                </div>
              </template>
  
              <!-- Message avec formulaire -->
              <template v-else-if="message.type === 'form'">
                <form @submit.prevent="handleFormSubmit(message.formAction)">
                  <div v-for="(field, i) in message.fields" :key="i">
                    <label :for="field.name">{{ field.label }}</label>
                    <input
                      v-model="formData[field.name]"
                      :type="field.type"
                      :id="field.name"
                      :name="field.name"
                    />
                  </div>
                  <button type="submit">Envoyer</button>
                </form>
              </template>
            </div>
          </div>
  
          <!-- Zone d'entrée utilisateur -->
          <div class="chat-input">
            <textarea
              v-model="userInput"
              placeholder="Posez une question..."
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
          { from: "bot", type: "text", text: "Bonjour ! Tapez 'boutons' ou 'formulaire' pour voir un exemple." },
        ],
        userInput: "", // Initialisation correcte de la saisie utilisateur
        formData: {}, // Contient les données des formulaires
      };
    },
    methods: {
      sendMessage() {
        const trimmedInput = this.userInput.trim(); // Nettoyage de la saisie
        if (trimmedInput === "") {
          console.log("Saisie vide, aucun message envoyé.");
          return;
        }
  
        // Ajouter le message de l'utilisateur
        this.messages.push({ from: "user", type: "text", text: trimmedInput });
  
        // Interpréter la saisie utilisateur
        setTimeout(() => {
          this.interpretUserInput(trimmedInput.toLowerCase());
        }, 500);
  
        // Réinitialiser la zone de saisie
        this.userInput = "";
      },
      interpretUserInput(input) {
        if (input === "boutons") {
          // Réponse avec boutons
          this.messages.push({
            from: "bot",
            type: "button",
            text: "Voici des options :",
            buttons: [
              { label: "Option 1", action: "option1" },
              { label: "Option 2", action: "option2" },
            ],
          });
        } else if (input === "formulaire") {
          // Réponse avec formulaire
          this.messages.push({
            from: "bot",
            type: "form",
            text: "Remplissez ce formulaire :",
            fields: [
              { label: "Nom :", name: "name", type: "text" },
              { label: "Email :", name: "email", type: "email" },
            ],
            formAction: "submitForm",
          });
        } else {
          // Réponse générique
          this.messages.push({
            from: "bot",
            type: "text",
            text: `Je ne comprends pas "${input}". Essayez 'boutons' ou 'formulaire'.`,
          });
        }
      },
      handleButtonClick(action) {
        console.log("Action bouton cliquée :", action);
        this.messages.push({
          from: "user",
          type: "text",
          text: `Vous avez cliqué sur : ${action}`,
        });
  
        // Simule une réponse après le clic sur un bouton
        setTimeout(() => {
          this.messages.push({
            from: "bot",
            type: "text",
            text: `Action "${action}" traitée !`,
          });
        }, 500);
      },
      handleFormSubmit(action) {
        console.log("Formulaire soumis pour action :", action, this.formData);
  
        // Ajouter les données soumises dans les messages
        this.messages.push({
          from: "user",
          type: "text",
          text: `Formulaire soumis : ${JSON.stringify(this.formData)}`,
        });
  
        // Simule une réponse du bot après soumission
        setTimeout(() => {
          this.messages.push({
            from: "bot",
            type: "text",
            text: `Merci pour vos informations. Action "${action}" en cours.`,
          });
        }, 500);
  
        // Réinitialiser les données du formulaire
        this.formData = {};
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
  
  .chat-button {
    margin: 5px;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chat-button:hover {
    background-color: #0056b3;
  }
  </style>
  