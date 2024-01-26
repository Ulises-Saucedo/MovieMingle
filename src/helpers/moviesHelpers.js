import MovieProvider from "../providers/movies";

const API_KEY = import.meta.env.VITE_API_KEY
const movieProvider = new MovieProvider()

export async function getMovies(){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
        const json = await response.json()
        movieProvider.movies.value = json.results
    }catch(e){
        console.log(e)
    }
}

export async function getMoviesGenres(){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        const json = await response.json()
        return json
    }catch(e){
        console.log(e)
    }
}

export async function getMoviesByGenres(){
    try{
        const genresResponse = await getMoviesGenres()
        const promises = genresResponse.genres.map(async (el) => {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${el.id}&api_key=${API_KEY}`)
            const json = await response.json()
            return json
        })
        const data = await Promise.all(promises)
        return data
    }catch(e){
        console.log(e)
    }
}

export async function getByCategory(category){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=${API_KEY}`)
        const json = await response.json()
        return json
    }catch(e){
        console.log(e)
    }
}
// movieProvider.totalPages.value = 500 -> futuro