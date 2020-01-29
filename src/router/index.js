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
            const userData = store.state.userDetails;
            userData['status'] = 'OFFLINE';
            Vue.axios.put(store.getters.changeStatusRoute, userData).then(response => {
                if (response.status < 400) {
                    next('/login');
                }
            });
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
