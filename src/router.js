import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import * as types from './store/type'
import homeContent from './view/home'
import login from './view/login'
import community from './view/community'
import reply from './view/reply'

var router = new VueRouter({
    routes : [
        {
            path : '/',
            name : 'home',
            component : homeContent,
        },
        {
            path : '/login',
            name : 'login',
            component : login
        },
        {
            path : '/community',
            name : 'community',
            component : community
        },
        {
            path : '/reply',
            name : 'reply',
            component : reply,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, {username:window.localStorage.getItem('username'),accout:window.localStorage.getItem('token')})
}

//注册全局钩子用来拦截导航
   router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
        if (store.state.token) {
            next();
        }else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }else {
        next();
    }
})

export default router