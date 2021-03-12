import {createRouter, createWebHistory} from 'vue-router'
import $store from '../store/index'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Page Not Found',
        component: () => import('../views/PageNotFound.vue')
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: () => import('../components/Auth.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // @TODO: vuex - get value with getters
    if (to.name !== 'Authentication' && to.name !== 'Page Not Found' && $store.state.user === null) next({name: 'Authentication'})
    else next()
})

export default router
