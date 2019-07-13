import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './type'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            username : ''
        },
        token: null,
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data.accout;
            localStorage.username = data.username
            state.token = data.accout;
            state.user.username = data.username
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})