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
		roomDetail: {
			id: '',
			users: []
		},

		//聊天历史
		messageHistory: {},
		//群聊天的头部
		//groupHeadName: {}

		//好友信息
		friendInfo: {
			nickname: '',  //昵称
			password: '', //备注
			pictureAddress: '', //头像
			username: '', //用户名
		},

		//聊天历史
		chatHistory: [],

	},
	getters: {
		getUser: state => state.user
	},
	mutations: {
		setUser (state, data){
			state.user = data
		},
		setUserHead (state, data) {
			if(state.user)
				state.user.pictureAddress = data
		},

		/*setGroupHeadName (state,data){
			state.groupHeadName.head = data
		}*/

		setFriendInfo (state, data) {
			state.friendInfo = data
		},
		setChatHistory (state, data) {},
	},
	actions: {	
	},
})
export default store