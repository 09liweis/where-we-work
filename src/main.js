import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSource from 'vue-resource';
import MuseUI from 'muse-ui';
import router from './router/router.js';
import store from './store/store.js';

import App from './App.vue';

import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);
Vue.use(VueSource);
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDm9CvJGdlS7X20LxX5Y63b5RyLsjTO4Sc',
        libraries: 'places'
    }
});

const http =  {
    emulateJSON: true,
    emulateHTTP: true
};

Vue.http.options.emulateJSON = true;

Vue.config.productionTip = true;
new Vue({
    http,
    router,
    store,
    el: '#app',
    render: h => h(App)
});