<template>
    <div class="chat-input">
      <textarea
        :value="userInput"
        @input="onInput"
        placeholder="Posez une question..."
        @keyup.enter="sendMessage"
        rows="3"
      ></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userInput: { type: String, required: true },
    },
    methods: {
      onInput(event) {
        this.$emit("update:userInput", event.target.value); // Émet une mise à jour de la prop
      },
      sendMessage() {
        this.$emit("send-message", this.userInput); // Émet l'événement `send-message`
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-input {
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
  }
  
  textarea {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    box-sizing: border-box;
  }
  </style>
  