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
        hasCenter: false,
        markers: []
    },
    api: {
        signup: '/users/signup',
        login: '/users/login',
        users: '/users/',
        userDetail: '/users/' + window.localStorage.getItem('id'),
        updateUser: '/users/' + window.localStorage.getItem('id') // window.localStoreage not working here
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
    renderMarker(state, marker) {
        const markers = state.map.markers;
        markers.push(marker);
        state.map.markers = markers;
    },
    login(state, user) {
        state.user.login = true;
        state.user.id = user._id;
        window.localStorage.setItem('id', user._id);
    },
    logout(state) {
        state.user.login = false;
        state.user.id = '';
        window.localStorage.setItem('id', '');
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations
});