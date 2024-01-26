<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const emits = defineEmits(["onSearch", "onSearched"]);
const query = ref("");

const handleEmit = () => {
  emits("onSearch", query.value);
};

const handleSearch = () => {
  emits("onSearched", query.value);
};
</script>

<template>
  <header
    class="w-full h-[75px] flex justify-between items-center p-4 bg-[#131315]"
  >
    <router-link to="/" class="max-h-full max-w-[200px] flex justify-start">
      <img
        src="../assets/moviemingle-high-resolution-logo-transparent.png"
        alt="Logo"
        class="object-contain"
      />
    </router-link>
    <input
      type="text"
      class="rounded-sm p-1 bg-[#27272A] text-[#fff]"
      placeholder="Search"
      v-model="query"
      @keypress.enter.prevent="
        route.name == 'movies' ? handleEmit() : handleSearch()
      "
    />
  </header>
</template>
