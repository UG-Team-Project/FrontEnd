import Dashboard from '@/views/Dashboard';
import UserProfile from '@/views/UserProfile';
import TableList from '@/views/TableList';
import Login from '@/views/Login';
import VueRouter from 'vue-router';
import Maps from '@/views/Maps';
import Vue from 'vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        name: 'dashboard-index',
        path: '/dashboard',
        component: Dashboard
    },
    { name: 'asd1', path: '/dashboard/user-profile', component: UserProfile },
    { name: 'asd2', path: '/dashboard/table-list', component: TableList },
    { name: 'asd3', path: '/dashboard/maps', component: Maps },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
    // {
    //     path: '*',
    //     redirect: '/login'
    // }
];
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (store.getters.isLogged) {
        if (to.fullPath === '/login') {
            store.getters.isLogged = false;
            next('/login');
        } else {
            next();
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
