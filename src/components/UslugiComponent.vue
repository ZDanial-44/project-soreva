<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";

import UslugiComponentDowner from ".././components/componentsDowner/UslugiComponentDowner.vue";
const UslugiComponentMDEV = ref([]); // IMPORTANT ^-^


const filters = reactive({
  sortBy: "",
  searchQuery: "",
});

onMounted(async () => {
  try {
    const { data } = await axios.get("https://5189807337ef00ab.mokky.dev/UslugiComponentMDEV");
    UslugiComponentMDEV.value = data;
  } catch (error) {
    console.log(error);
  }
});

watch(filters, async () => {
  try {
    const { data } = await axios.get(
      "https://5189807337ef00ab.mokky.dev/UslugiComponentMDEV?sortBy=" + filters.sortBy
    );
    UslugiComponentMDEV.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="w-4/5 mt-8 m-auto rounded-xl shadow-xl h-auto pb-1 bg-netural-900">
    <div class="flex justify-between m-6">
      <div>
        <h2 class="font-bold text-xl text-slate-100">Услуги</h2>
      </div>
      <select
        @change="(e) => (filters.sortBy = e.target.value)"
        class="rounded-md shadow-sm p-2"
      >
        <option value="header">По названию(А-Я)</option>
        <option value="-header">По названию(Я-А)</option>
        <option value="type">По категрии(А-Я)</option>
        <option value="-type">По категрии(Я-A)</option>
      </select>
    </div>
    <UslugiComponentDowner :UslugiComponentMDEV="UslugiComponentMDEV" />
  </div>
</template>
