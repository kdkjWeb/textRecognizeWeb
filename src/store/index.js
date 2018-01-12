/**
 * vuex config manage
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//用户
		user: {},

		//房间信息
		roomInfo: {
			id: '',
			users: []
		},

		//聊天历史
		messageHistory: {},

	},
	getters: {
		getUser: state => state.user
	},
	mutations: {
		setUser (state, data){
			state.user = data
		},
	},
	actions: {},
})

export default store