import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Urls from '../views/Urls.vue';
import Visuals from '../views/Visuals.vue';
import VisualForm from '../views/VisualForm.vue';

Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: [
         { path: '/', component: Home },
         { path: '/page', component: Urls },
         { path: '/visuals', component: Visuals, name: 'home' },
         { path: '/visuals/add', component: VisualForm },
         { path: '/visuals/edit/:id', component: VisualForm, name: 'edit' },
    ]
});