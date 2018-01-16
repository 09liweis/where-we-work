import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    message: 'Hello Vuex',
    api: {
    }
};

export default new Vuex.Store({
    state
});