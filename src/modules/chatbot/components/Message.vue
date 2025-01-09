<template>
    <div class="chat-message" :class="message.from">
      <template v-if="message.type === 'text'">
        <p>{{ message.text }}</p>
      </template>
  
      <template v-else-if="message.type === 'button'">
        <div>
          <p>{{ message.text }}</p>
          <Button
            v-for="(btn, i) in message.buttons"
            :key="i"
            class="chat-button"
            @click="$emit('button-click', btn.action)"
          >
            {{ btn.label }}
          </button>
        </div>
      </template>
  
      <template v-else-if="message.type === 'form'">
        <form @submit.prevent="$emit('form-submit', message.formAction)">
          <div v-for="(field, i) in message.fields" :key="i">
            <label :for="field.name">{{ field.label }}</label>
            <input
              v-model="formData[field.name]"
              :type="field.type"
              :id="field.name"
              :name="field.name"
            />
          </div>
          <Button type="submit">Envoyer</button>
        </form>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: { type: Object, required: true },
      formData: { type: Object, required: true },
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  