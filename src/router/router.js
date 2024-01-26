import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/movies'
    },
    {
        path: '/movies',
        name: 'movies',
        component: () => import(/* webpackChunkName: "movies" */ '../views/Movies.vue')
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue')
    },
    {
        path: '/movies-category',
        name: 'moviescategory',
        component: () => import(/* webpackChunkName: "moviescategory" */ '../views/MoviesCategory.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router