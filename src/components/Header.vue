<script setup>
import { ref } from "vue";

const emits = defineEmits(["onSearch"]);
const query = ref("");

const handleEmit = () => {
  emits("onSearch", query.value);
};
</script>

<template>
  <header
    class="w-full h-[75px] flex justify-between items-center p-4 bg-[#131315]"
  >
    <img
      src="../assets/moviemingle-high-resolution-logo-transparent.png"
      alt="Logo"
      class="max-h-full max-w-[200px] object-contain"
    />
    <input
      type="text"
      class="rounded-sm p-1 bg-[#27272A] text-[#fff]"
      placeholder="Search"
      v-model="query"
      @keypress.enter.prevent="handleEmit"
    />
  </header>
</template>
