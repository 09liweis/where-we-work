import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';

import EditProfile from '../views/EditProfile.vue';

Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: [
         { path: '/', component: Home },
         { path: '/signup', component: Signup },
         { path: '/login', component: Login },
         { path: '/editProfile', component: EditProfile },
    ]
});