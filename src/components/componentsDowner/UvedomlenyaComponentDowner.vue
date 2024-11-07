<template>
  <div>
    <div v-if="UvedomlenyaComponentMDEV.length === 0">
      <p class="text-slate-200">MyPetro</p>
    </div>
    <ul class="text-left">
      <li
        v-for="item in UvedomlenyaComponentMDEV"
        :key="item.id"
        class="border-b-2 border-neutral-800"
      >
        <div>
          <b class="text-lg text-slate-200">
            {{ item.title || 'Без названия' }}
          </b>
          <br />
          <span class="text-slate-200">
            {{ item.date || 'Без ffffffffff' }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  /* eslint-disable no-unused-vars */
  import { defineProps } from 'vue';

  const props = defineProps({
    UvedomlenyaComponentMDEV: {
      type: Array,
      required: true,
    },
  });
</script>
