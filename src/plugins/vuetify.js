import Vue from 'vue';
import Vuetify from 'vuetify';
// import theme from './theme';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

const opts = {
    iconfont: 'mdi',
    theme: { disable: true },
};

const vuetify =  new Vuetify(opts);

export default vuetify;
