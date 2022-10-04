import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/vueHome.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'vueMain',
        component: () => import('../views/vueMain.vue'),
        redirect: '/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'vueHome',
            //     component: () => import('../views/vueHome/vueHome.vue'),
            // },
            // {
            //     path: '/user',
            //     name: "vueUser",
            //     component: () => import('../views/vueUser/vueUser.vue')
            // },
            // {
            //     path: '/mall',
            //     name: "vueMall",
            //     component: () => import('../views/vueMall/vueMall.vue')
            // },
            // {
            //     path: '/page1',
            //     name: "vuePageOne",
            //     component: () => import('../views/vueOther/vuePageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: "vuePageTwo",
            //     component: () => import('../views/vueOther/vuePageTwo.vue')
            // }
        ]
    },
    {
        path: '/login',
        name: 'vueLogin',
        component: () => import('../views/vueLogin/vueLogin.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router