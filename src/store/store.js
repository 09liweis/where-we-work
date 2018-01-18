import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    message: 'Hello Vuex',
    map: {
        center: {
            lat: '',
            lng: ''   
        },
        hasCenter: false
    },
    api: {
        signup: '/users/signup'
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
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations
});