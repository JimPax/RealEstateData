import Vue from 'vue';
import Vuex from 'vuex';
import dataState from './modules/dataState';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        dataState
    }
})