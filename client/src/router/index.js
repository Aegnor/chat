import {createRouter, createWebHistory} from 'vue-router'
import $store from '../store/index'

const routes = [
    {
        path: '/',
        name: 'Chat',
        component: () => import('../views/Chat.vue')
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
    if (to.name !== 'Authentication' && to.name !== 'Page Not Found' && $store.getters.user === null) {
        $store.dispatch('addNotification', {
            data: 'You need to authenticate first',
            type: 'warning'
        })
        next({name: 'Authentication'})
    } else {
        next()
    }
})

export default router
