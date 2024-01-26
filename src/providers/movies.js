import { ref } from "vue"

const API_KEY = import.meta.env.VITE_API_KEY

export default class MovieProvider{
    constructor(){
        this.page = ref(1)
        this.totalPages = ref(0)
        this.query = ref(null)
        this.movies= ref([])
        this.movie = ref(null)
    }

    async getMovies(){
        try{
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
            const json = await response.json()
            this.movies.value = json.results
            this.totalPages.value = 500
            return json
        }catch(e){
            console.log(e)
        }
    }

    async getMoviesPage(page){
        try{
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`)
            const json = await response.json()
            this.movies.value = json.results
        }catch(e){
            console.log(e)
        }
    }

    async filterMoviesByName(name){
        try{
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${API_KEY}`)
            const json = await response.json()
            return json
        }catch(e){
            console.log(e)
        }
    }

    async filterMovieById(id){
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            const json = await response.json()
            this.movie.value = json
        }catch(e){
            console.log(e)
        }
    }
}