<template>
  <div class="page-container">
    <header class="page-header">
      <h1>Chatbot</h1>
    </header>
    <main class="page-content">
      <div class="chat-container">
        <ChatMessages
          :messages="messages"
          :formData="formData"
          @button-click="handleButtonClick"
          @form-submit="handleFormSubmit"
        />
        <ChatInput
  :userInput="userInput"
  @update:userInput="userInput = $event"
  @send-message="sendMessage"
/>
      </div>
    </main>
  </div>
</template>

<script>
import ChatMessages from "./components/ChatMessages.vue";
import ChatInput from "./components/ChatInput.vue";

export default {
  components: { ChatMessages, ChatInput },
  data() {
    return {
      messages: [
        { from: "bot", type: "text", text: "Bonjour ! Tapez 'boutons' ou 'formulaire' pour voir un exemple." },
      ],
      userInput: "",
      formData: {},
    };
  },
  methods: {
    sendMessage(input) {
      const trimmedInput = input.trim();
      if (trimmedInput === "") return;

      this.messages.push({ from: "user", type: "text", text: trimmedInput });

      setTimeout(() => {
        this.interpretUserInput(trimmedInput.toLowerCase());
      }, 500);

      this.userInput = "";
    },
    interpretUserInput(input) {
      if (input === "boutons") {
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
        this.messages.push({
          from: "bot",
          type: "text",
          text: `Je ne comprends pas "${input}". Essayez 'boutons' ou 'formulaire'.`,
        });
      }
    },
    handleButtonClick(action) {
      this.messages.push({
        from: "user",
        type: "text",
        text: `Vous avez cliqué sur : ${action}`,
      });

      setTimeout(() => {
        this.messages.push({
          from: "bot",
          type: "text",
          text: `Action "${action}" traitée !`,
        });
      }, 500);
    },
    handleFormSubmit(action) {
      this.messages.push({
        from: "user",
        type: "text",
        text: `Formulaire soumis : ${JSON.stringify(this.formData)}`,
      });

      setTimeout(() => {
        this.messages.push({
          from: "bot",
          type: "text",
          text: `Merci pour vos informations. Action "${action}" en cours.`,
        });
      }, 500);

      this.formData = {};
    },
  },
};
</script>

