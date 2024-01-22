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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router