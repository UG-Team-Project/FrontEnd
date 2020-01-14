import Dashboard from '@/views/Dashboard';
import UserProfile from '@/views/UserProfile';
import TableList from '@/views/TableList';
import Login from '@/views/Login';
import Maps from '@/views/Maps';


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
];

export default routes;