import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: {
        id: window.localStorage.getItem('id') || '',
        login: window.localStorage.getItem('id') ? true : false
    },
    map: {
        center: {
            lat: '',
            lng: ''   
        },
        hasCenter: false
    },
    api: {
        signup: '/users/signup',
        login: '/users/login'
    }
};

const getters = {
    mapCenter: state => {
        return state.map;
    }
};

const mutations = {
    setMapCenter(state, location) {
        state.map.center = location;
        state.map.hasCenter = true;
    },
    login(state, user) {
        state.user.login = true;
        state.user.id = user._id;
        window.localStorage.setItem('id', user._id);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations
});