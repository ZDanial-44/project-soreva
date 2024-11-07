<template>
  <div
    class="text-slate-200 m-6 mt-4 gap-6 text-center grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  > 
    <div v-for="item in SobytiaComponentMDEV" :key="item.id" class="max-w-full">
      <a :href="`/SobytiaComponentGenerated${item.идентификатор}.html`">
      <div class="image-container">  
        <img :src="item.imageUrl" alt="#" class="rounded-xl shadow-lg" />
      </div>
        <b>{{ item.header || 'Без заголовка' }}</b>
        <br>
          <p>Дата: {{ item.date }}</p>
      </a>
    </div>
  </div>
</template>

<style>
.image-container {
    border-radius: 5px;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
}
</style>

<script setup>
  /* eslint-disable no-unused-vars */
  import { defineProps } from 'vue';

  const props = defineProps({
    SobytiaComponentMDEV: {
      type: Array,
      required: true,
    },
  });
</script>
