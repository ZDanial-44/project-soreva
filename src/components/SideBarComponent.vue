<template>
    <div>
      <button @click="toggleSidebar" class="open-btn">
        <span v-if="!isOpen">&#9776;</span>
        <span v-if="isOpen">&#10005;</span>
      </button>
  
      <div :class="['sidebar', { open: isOpen }]">
        <div class="sidebar-content text-center">
          <h2 class="border-b-2 pb-2 font-bold text-lg">Меню</h2>
          <ul class="mt-2 leading-loose">
            <h4 class=" font-bold">
              Пользователь
            </h4>
            <div v-if="user">
              <img v-if="user.photoURL" :src="user.photoURL" alt="User Photo" class="w-16 h-16 rounded-full mx-auto" />
              <h2 class="text-white font-bold">{{ user.displayName }}</h2>
              <button
                @click="signOutUser"
                class="bg-red-500 text-white px-4 py-2 rounded"
              >
                Выйти
              </button>
            </div>
            <div v-else>
              <h2 class="text-white mr-7">Пожалуйста, войдите в систему</h2>
              <LoginComponent class="mr-7" />
            </div>
            
          <button
            @click="currentComponent = 'KartaComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Карта
          </button>
          </ul>
          <img
            src="../assets/QRcode.jpg"
            alt="#QR"
            class="mt-4 border-t-2 pt-4"
          />
          <b>QR Экстренный вызов!</b>
          <button @click="makeEmergencyCall" class="bg-red-500 rounded mt-4">
            Экстренный звонок по телефонному номеру
          </button>
          <div class=" text-lg border-t-2 pt-4 mt-4">
            <b>Мчс 112</b>
            <br />
            <b>Пожарная служба: 101</b>
            <br />
            <b>Полиция: 102</b>
            <br />
            <b>Скорая помощь: 103</b>
            <br />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import LoginComponent from './LoginComponent.vue';
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  
    export default {
      name: 'EmergencyButton',
      components: {
        LoginComponent,
      },
      data() {
        return {
          isOpen: false, // Состояние Sidebar
          user: null, // Пример пользователя, установите ваше состояние здесь
        };
      },
      created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          this.user = user;
        });
      },
      methods: {
        toggleSidebar() {
          this.isOpen = !this.isOpen;
        },
        makeEmergencyCall() {
          window.location.href = 'tel:+7 775 190 0924';
        },
        signOutUser() {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              console.log('User signed out');
            })
            .catch((error) => {
              console.error('Error signing out: ', error);
            });
        },
      },
    };
  </script>
  
  <style scoped>
    .open-btn {
      position: fixed;
      top: 0.65%;
      right: 0.65%;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      z-index: 1000;
      border-radius: 5px;
    }
  
    .open-btn:hover {
      background-color: rgba(43, 43, 43, 0.9);
    }
  
    
    .sidebar {
      position: fixed;
      top: 0;
      right: -250px; 
      width: 250px;
      height: 100%;
      background-color: #333;
      color: white;
      transition: right 0.3s ease-in-out;
      z-index: 999;
    }
  
    .sidebar.open {
      right: 0; 
    }
  
    .sidebar-content {
      padding: 20px;
    }
  
    .sidebar ul {
      list-style: none;
      padding: 0;
    }
  
    .sidebar li {
      margin: 15px 0;
    }
  
    .sidebar a {
      color: white;
      text-decoration: none;
    }
  
    .sidebar a:hover {
      text-decoration: underline;
    }
  </style>
  