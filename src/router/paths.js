import Dashboard from '@/views/Dashboard';
import UserProfile from '@/views/UserProfile';
import Login from '@/views/Login';
import Maps from '@/views/Maps';
import Status from "@/views/Status";


const routes = [
    {
        name: 'dashboard-index',
        path: '/dashboard',
        component: Dashboard
    },
    { name: 'user-profile', path: '/dashboard/user-profile', component: UserProfile },
    { name: 'maps', path: '/dashboard/maps', component: Maps },
    { name: 'status', path: '/dashboard/status', component: Status },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

export default routes;