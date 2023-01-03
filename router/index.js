import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        // 主路由
        path: '/',
        name: 'main', // 动态添加时使用
        component: () => import('../views/vueMain.vue'),
        redirect: '/home',
        /* children: [
            // 子路由
             {  
                path: '/home',
                name: 'vueHome',
                component: () => import('../views/vueHome/vueHome.vue'),
            },
            {
                path: '/user',
                name: "vueUser",
                component: () => import('../views/vueUser/vueUser.vue')
            },
            {
                path: '/mall',
                name: "vueMall",
                component: () => import('../views/vueMall/vueMall.vue')
            },
            {
                path: '/page1',
                name: "vuePageOne",
                component: () => import('../views/vueOther/vuePageOne.vue')
            },
            {
                path: '/page2',
                name: "vuePageTwo",
                component: () => import('../views/vueOther/vuePageTwo.vue')
            } 
        ] */
    },
    {
        path: '/login',
        name: 'vueLogin',
        component: () => import('../views/vueLogin/vueLogin.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// 全局路由守卫 前置守卫
router.beforeEach((to, from, next) => {
    store.commit('getToken');
    const token = store.state.user.token;
    //若token不存在且即将要进入的目标不是登录页
    if (!token && to.name !== 'vueLogin') {
        next({ name: 'vueLogin' });
    }
    //若token存在且即将要进入的目标是登录页，则让其回到首页
    else if (token && to.name === 'vueLogin') {
        next({ name: 'vueHome' });
    }
    else {
        next();
    }
});


export default router;