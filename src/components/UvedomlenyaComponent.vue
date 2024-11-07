<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";

import UvedomlenyaComponentDowner from ".././components/componentsDowner/UvedomlenyaComponentDowner.vue";
const UvedomlenyaComponentMDEV = ref([]); // IMPORTANT ^-^


const filters = reactive({
  sortBy: "",
  searchQuery: "",
});

onMounted(async () => {
  try {
    const { data } = await axios.get("https://5189807337ef00ab.mokky.dev/UvedomlenyaComponentMDEV");
    UvedomlenyaComponentMDEV.value = data;
  } catch (error) {
    console.log(error);
  }
});

watch(filters, async () => {
  try {
    const { data } = await axios.get(
      "https://5189807337ef00ab.mokky.dev/UvedomlenyaComponentMDEV?sortBy=" + filters.sortBy
    );
    UvedomlenyaComponentMDEV.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="w-4/5 mt-8 m-auto rounded-xl shadow-xl h-auto pb-1 bg-netural-900">
    <div class="flex justify-between m-6">
      <div>
        <h2 class="font-bold text-xl text-slate-100">Уведомления</h2>
      </div>
      <select
        @change="(e) => (filters.sortBy = e.target.value)"
        class="rounded-md shadow-sm p-2"
      >
        <option value="идентификатор">По дате(новые)</option>
        <option value="-идентификатор">По дате(старые)</option>
        <option value="title">По названию(А-Я)</option>
        <option value="-title">По названию(Я-А)</option>
      </select>
    </div>
      <UvedomlenyaComponentDowner :UvedomlenyaComponentMDEV="UvedomlenyaComponentMDEV" />
  </div>
</template>