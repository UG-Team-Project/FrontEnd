import Vue from 'vue';

// Components
import './components';

// Plugins
import './plugins';
import router from '@/plugins/routes';

import { sync } from 'vuex-router-sync';

// Application imports
import App from './App';

import store from '@/store';
import vuetify from '@/plugins/vuetify';

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
