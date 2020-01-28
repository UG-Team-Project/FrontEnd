import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        // key: 'AIzaSyDopQ-G7YkNgb_JelPgLAJ0eT__ZSuBwM4',
        key: '',
        libraries: 'places', // This is required if you use the Autocomplete plugin
    },
    installComponents: true
});