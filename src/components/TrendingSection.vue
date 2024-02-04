<script setup>
const props = defineProps({
  trending: {
    type: Array,
  },
  genres: {
    type: Array,
  },
});

const { trending, genres } = props;
</script>

<template>
  <section
    class="p-5 mt-32 md:mt-48 mx-auto max-w-[1200px] flex justify-center flex-wrap gap-3"
  >
    <router-link
      v-for="genre in genres"
      class="py-1 px-5 bg-[#424167] border-[#919ac9] border-[1px] border-solid rounded-3xl hover:scale-110 cursor-pointer duration-300 ease-in-out text-[#fff]"
      to="#"
      >{{ genre.name }}</router-link
    >
  </section>
  <section class="p-5 mt- md:mt-48 text-[#fff] font-semibold text-2xl">
    Trending movies
  </section>
  <section
    class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5 p-5 mx-auto w-[full]"
  >
    <div
      v-for="(movie, i) in trending"
      :key="i"
      class="overflow-hidden rounded-md"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
        :alt="movie.title"
        class="duration-300 ease-in-out scale-125 cursor-pointer hover:scale-100"
      />
    </div>
  </section>
</template>
