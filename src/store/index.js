/**
 * vuex config manage
 */

import Vue from 'vue'
import Vuex from 'vuex'
import {deepClone} from '@/utils/publicFunctions'

Vue.use(Vuex)
const initStore = {
	//用户
	user: {},

	//房间信息
	roomDetail: {
		id: '',
		users: []
	},

	//好友信息
	friendInfo: {
		nickname: '',  //昵称
		password: '', //备注
		pictureAddress: '', //头像
		username: '', //用户名
	},

	//聊天历史
	chatHistory: [],

	//未读聊天信息
	selfUnReadInfos: [
		// {
		// 	msgFrom: '',//发送人
		// 	count: 0, //未读数量
		// }
	],
	//总的未读消息数量
	unReadCount: 0,
}

const store = new Vuex.Store({
	state: deepClone(initStore),
	getters: {
		getUser: state => state.user,

		//获取未读聊天信息
		getSelfUnReadInfos: state => state.selfUnReadInfos,

		//获取未读消息总数
		getUnReadCount: state => state.unReadCount,
	},
	mutations: {
		setUser (state, data){
			state.user = data
		},
		setUserHead (state, data) {
			if(state.user)
				state.user.pictureAddress = data
		},

		setFriendInfo (state, data) {
			state.friendInfo = data
		},
		setChatHistory (state, data) {},

		addSelfUnReadCount (state, data) {
			//先检查是否存在该人的聊天室
			let index = false
			for(let elem of Object.values(state.selfUnReadInfos)){
				//存在则将count 相加
				if(elem.msgFrom == data.msgFrom){
					elem.count += data.count
					index = true
					break
				}
			}
			if(!index){
				//不存在则push 一个新的聊天记录
				state.selfUnReadInfos.push(data)
			}
		},
		addUnReadCount (state, data) {
			state.unReadCount += parseInt(data)
		},
		reduceUnReadCount (state, data) {
			state.unReadCount -= parseInt(data)
		},
		reset(state) {
			console.log('清空state')
			for(let [index, elem] of Object.entries(initStore)){
				state[index] = deepClone(elem)
			}
		},
		resetUnReadInfoNum(state) {
			state.unReadCount = 0
			state.selfUnReadInfos = []
		},
	},
	actions: {	
	},
})
export default store