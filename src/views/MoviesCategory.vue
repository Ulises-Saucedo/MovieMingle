<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies } from "../store/moviesStore";
import { verifyQueries } from "../helpers/moviesHelpers";
import { getUrl } from "../helpers/moviesHelpers";

const scrollComponent = ref(null);
const store = useMovies();
const router = useRouter();
const route = useRoute();
const searched = ref("");

const handleScroll = async () => {
  let element = scrollComponent.value;
  const threshold = window.innerHeight + 100;
  if (element.getBoundingClientRect().bottom <= threshold) {
    await store.loadMoreData(getUrl(route.query));
  }
};

const handleInput = () => {
  router.replace({ query: { q: searched.value } });
};

watch([() => route.query.q, () => route.query.category], async () => {
  await verifyQueries(route);
});

window.addEventListener("scroll", handleScroll);
await verifyQueries(route);
</script>

<template>
  <div class="flex justify-end w-full p-5">
    <input
      type="text"
      class="py-1 px-3 z-30 rounded-2xl font-normal bg-[#242335] text-[#fff] border-[1px] border-solid border-slate-600 focus:outline-1 focus:outline-double focus:outline-slate-500 placeholder:italic placeholder:text-slate-600"
      placeholder="Search..."
      v-model="searched"
      @keyup.enter="handleInput"
    />
  </div>

  <section
    class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5 p-5 mx-auto w-[full]"
    ref="scrollComponent"
  >
    <div
      v-for="(movie, i) in store.movies"
      :key="i"
      class="overflow-hidden rounded-md"
    >
      <router-link :to="{ name: 'movie', params: { id: movie.id } }">
        <img
          :src="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
          :alt="movie.title"
          class="duration-300 ease-in-out scale-125 cursor-pointer hover:scale-100"
        />
      </router-link>
    </div>
  </section>
</template>
