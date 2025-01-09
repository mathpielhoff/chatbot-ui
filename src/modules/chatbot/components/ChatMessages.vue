<template>
    <div class="chat-messages">
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :formData="formData"
        @button-click="$emit('button-click', $event)"
        @form-submit="$emit('form-submit', $event)"
      />
    </div>
  </template>
  
  <script>
  import Message from "./Message.vue";
  
  export default {
    components: { Message },
    props: {
      messages: { type: Array, required: true },
      formData: { type: Object, required: true },
    },
  };
  </script>
  
  <style scoped>
  .chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
  }
  </style>
  