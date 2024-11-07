<template>
  <div class="text-center">
    <div id="app">
      <nav class="flex justify-between items-center bg-zinc-800 p-2 font-medium">
        <div class="ml-5 flex items-center gap-2">
          <img
            src="./assets/icon.jpg"
            alt="Logo"
            class="w-10 h-10 rounded-md"
          />
          <span class="hidden sm:inline text-white text-lg font-bold">MyPetro</span>
        </div>

        <div class="flex-1 flex justify-center space-x-1 sm:space-x-4 lg:space-x-6">
          <button
            @click="currentComponent = 'SobytiaComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            События
          </button>
          <button
            @click="currentComponent = 'UslugiComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Услуги
          </button>
          <button
            @click="currentComponent = 'UvedomlenyaComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Уведомления
          </button>
          <button
            @click="currentComponent = 'ChatComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Чат
          </button>
          <button
            @click="currentComponent = 'OtzyvyComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Отзывы
          </button>
          <button
            @click="currentComponent = 'KartaComponent'"
            class="text-white hover:text-red-500 transition-colors"
          >
            Карта
          </button>
        </div>
        <SideBarComponent />
      </nav>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
  import LoginComponent from './components/LoginComponent.vue';
  /* eslint-disable no-unused-vars */

  import SobytiaComponent from './components/SobytiaComponent.vue';
  import UslugiComponent from './components/UslugiComponent.vue';
  import UvedomlenyaComponent from './components/UvedomlenyaComponent.vue';
  import ChatComponent from './components/ChatComponent.vue';
  import OtzyvyComponent from './components/OtzyvyComponent.vue';
  import KartaComponent from './components/KartaComponent.vue';
  import SideBarComponent from './components/SideBarComponent.vue';

  import 'leaflet/dist/leaflet.css';

  export default {
    name: 'App',
    components: {
      SobytiaComponent,
      UslugiComponent,
      UvedomlenyaComponent,
      ChatComponent,
      OtzyvyComponent,
      KartaComponent,
      SideBarComponent,
      LoginComponent,
    },
    data() {
      return {
        currentComponent: 'SobytiaComponent',
        user: null,
      };
    },
  };
</script>


<style>
.main-content {
  margin-left: 20px;
  padding: 20px;
  flex: 1;
}
</style>