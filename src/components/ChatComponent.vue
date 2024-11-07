<template>
  <div id="ThisIsAll">
    <div id="chat" ref="chat">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="message-info">
          <img v-if="user && user.photoURL" :src="user.photoURL" alt="User Photo" class="w-8 h-8 m-2 rounded-full" />
          <strong>{{ message.author }}:</strong>
          <span class="timestamp">{{ message.time }}</span>
        </div>
        <div class="message-text">
          <p>{{ message.text }}</p>
        </div>
      </div>
    </div>

    <input 
      id="TypeMassage"
      type="text" 
      v-model="messageInput" 
      @keydown.enter="sendMessage" 
      placeholder="Type a message" 
    />
    <button id="SendButton" @click="sendMessage">Отправить</button>
    <p v-if="messageInput.length > maxMessageLength" class="warning">
      Сообщение не может состоять из более чем {{ this.maxMessageLength }} символов!
    </p>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "KartaComponent",
  data() {
    return {
      messages: [],
      messageInput: "",
      user: null,
      maxMessages: 250,
      maxMessageLength: 120,
    };
  },
  mounted() {
    this.loadMessages();
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL, 
          };
        }
      });
    },
    sendMessage() {
      const messageText = this.messageInput.trim();

      if (messageText.length > this.maxMessageLength) {
        alert(`Сообщение не может состоять из более чем ${this.maxMessageLength} символов!`);
        return;
      }

      if (messageText && this.user) {
        const now = new Date();
        const message = {
          text: messageText,
          author: this.user.name || "Anonymous",
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          photoURL: this.user.photoURL,
        };
        this.addMessageToChat(message);
        this.saveMessageToLocalStorage(message);
        this.messageInput = "";
      }
    },
    addMessageToChat(message) {
      this.messages.push(message);

      if (this.messages.length > this.maxMessages) {
        this.messages.shift();
      }

      this.$nextTick(() => {
        this.$refs.chat.scrollTop = 0;
      });
    },
    saveMessageToLocalStorage(message) {
      let messages = localStorage.getItem("chatMessages");
      messages = messages ? JSON.parse(messages) : [];
      messages.push(message);

      if (messages.length > this.maxMessages) {
        messages = messages.slice(-this.maxMessages);
      }

      localStorage.setItem("chatMessages", JSON.stringify(messages));
    },
    loadMessages() {
      let messages = localStorage.getItem("chatMessages");
      this.messages = messages ? JSON.parse(messages) : [];
    },
  },
};
</script>

<style scoped>
#ThisIsAll {
  color: white;
  width: 80%;
  margin-left: 10%;
}
#chat {
  height: 100%;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column-reverse; 
}
input[type="text"] {
  width: 80%;
}
button {
  width: 15%;
}
.message {
  margin: 5px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.message-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 7%;

}
.message-text {
  background-color: #434343;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
  max-width: max-content;
  margin-left: 10%;
  text-align: left;
}
.timestamp {
  font-size: 0.8em;
  color: #888;
  margin-left: 10px;
}
.warning {
  color: red;
  font-size: 0.9em;
}

#TypeMassage {
  background: #303030;
  width: 70%;
  position: fixed;
  left: 10%;
  bottom: 1%;
  color: white;
  padding: 15px;
  border-radius: 10px 0px 0px 10px;

}
#SendButton {
  position: fixed;
  right: 5%;
  bottom: 1%;
  color: white;
  font-weight: bold;
  background: #e74c3c;
  padding: 15px;
  border-radius: 0px 10px 10px 0px;
}
#SendButton:hover{
  background: #c52a1a;
}
</style>
