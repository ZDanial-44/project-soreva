<template>
  <div class="text-center">
    <button
      @click="signInWithGoogle"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Войти с Google
    </button>
  </div>
</template>

<script>
  import { signInWithGoogle } from '../auth';

  export default {
    methods: {
      signInWithGoogle, 
    },
  };
</script>
