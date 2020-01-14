import Vue from 'vue';

import './components';
// Material icons
import './plugins';
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import router from '@/router/index';

import {sync} from 'vuex-router-sync';

import App from './App';

import store from '@/store';
import vuetify from '@/plugins/vuetify';

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;
Vue.use(VuetifyDialog, {
    context: {
        vuetify
    }
});
/* eslint-disable no-new */
export default new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
