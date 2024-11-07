<template>
  <div>
    <div v-if="UslugiComponentMDEV.length === 0">
      <p class="text-slate-200">MyPetro</p>
    </div>
    <ul class="gap-6 text-left">
      <li
        v-for="item in UslugiComponentMDEV"
        :key="item.id"
        class="border-b-2 border-neutral-800 m-8"
      >
        <a :href="`/UslugiComponentGenerated${item.идентификатор}.html`">
          <div>
            <b class="text-lg text-slate-200">
              {{ item.header || 'Без заголовка' }}
            </b>
            <br />
            <span class="text-slate-200">
              {{ item.type || 'Без названия' }}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  /* eslint-disable no-unused-vars */
  import { defineProps } from 'vue';

  const props = defineProps({
    UslugiComponentMDEV: {
      type: Array,
      required: true,
    },
  });
</script>
