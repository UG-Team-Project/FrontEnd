import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '@/store';
import routes from "@/router/paths";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    window.console.log(to.fullPath);
    if (store.getters.isLogged) {
        if (to.fullPath === '/login') {
            next('/dashboard')
        } else if (to.fullPath === '/logout') {
            store.commit('logout');
            next('/login');
        } else {
            next()
        }
    } else {
        if (to.fullPath !== '/login') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
