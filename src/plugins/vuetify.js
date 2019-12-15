import Vue from 'vue';
import Vuetify from 'vuetify';
import theme from './theme';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

const opts = {
    iconfont: 'mdi',
    theme
};

export default new Vuetify(opts);
