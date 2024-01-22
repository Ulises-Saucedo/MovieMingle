<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue';
    import MovieProvider from '../providers/movies.js'

    const loading = ref(false)
    const moviesRef = new MovieProvider()
    const movies = moviesRef.movies

    const onClickHandler = async (page) => {
        loading.value = true
        if(moviesRef.query.value == ''){
            await moviesRef.getMoviesPage(page)
        }else{
            moviesRef.page.value += page
            await moviesRef.filterMoviesByName(page, moviesRef.query.value)
        }
        loading.value = false
    }

    const searchMovies = async (query) =>{
        loading.value = true
        if(query == ''){
            await moviesRef.getMovies()
        }else{
            moviesRef.page.value = 1
            moviesRef.query.value = query
            await moviesRef.filterMoviesByName(moviesRef.page.value, query)
        }
        loading.value = false
    }

    await moviesRef.getMovies()
</script>

<template>
    <Header @onSearch="searchMovies"/>
    <section v-if="!loading">
        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 gap-4 max-w-[1000px] mx-auto">
            <div v-for="movie in movies" class="rounded overflow-hidden">
                <router-link :to="{name: 'movie', params:{ id: movie.id }}">
                    <img 
                        :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" 
                        :alt="movie.title"
                        class="h-full"
                    >
                </router-link>
            </div>
        </section>
    </section>
    <section v-else class="h-screen w-full flex items-center justify-center">
        <p>Cargando...</p>
    </section>
    <section class="flex justify-center p-4" v-if="movies.length > 0">
        <vue-awesome-paginate
            :total-items="moviesRef.totalPages.value * 20"
            :items-per-page="20"
            :max-pages-shown="5"
            v-model="moviesRef.page.value"
            :on-click="onClickHandler"
            paginate-buttons-class="btn-paginate"
        />
    </section>
    <section v-else class="flex items-center justify-center font-bold w-full h-screen text-xl">
        Sorry ;(, Sorry, try another search.
    </section>
</template>

<style>
    .btn-paginate{
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 5px;
        margin-inline: 5px;
        cursor: pointer;
        background: #C03F28
    }
</style>