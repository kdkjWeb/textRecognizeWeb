import services from './selfChatRoomServices'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			message: '',//发送的文字消息
			bottomSheet: {//控制底部菜单栏的显示
				message_index: null,
				show: false,
			}, 
			roomDetail: {
				title: '',//房间名
				roomId: '',//房间id
			},
			friendInfo: {},
			chatHistory: []
		}
	},
	created() {
		this.roomDetail = Object.assign({}, this.$route.query)
		console.log(this.$route.params)
		this.friendInfo = this.$route.params

		//获取localStorage的聊天历史记录
		const res = getItem(this.roomDetail.roomId)
		if(res)
			this.$set(this, 'chatHistory', res)
	},
	methods: {
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},
		enterRoomSetting() {
			this.$router.push({
				name: 'SelfChatRoomConfig'
			})
		},

		/* 底部菜单栏的事件 */

		/* 重新发送 */
		sendAgain() {
			console.log(this.bottomSheet.message_index)
			let data = {
				senderId: '-1',
				message: this.chatHistory[this.bottomSheet.message_index].message,
				header: '/static/header2.jpg'
			}

			//clear 
			this.chatHistory.splice(this.bottomSheet.message_index, 1)
			this.bottomSheet = {
				message_index: null,
				show: false,
			}


			this.chatHistory.push(data)
			setTimeout(()=>{
				this.$set(data, 'error', true)
				setItem({
					key: this.roomDetail.roomId,
					value: this.chatHistory
				})
			}, 2000)
		},

		/* 删除 */
		deleteMsg() {
			// console.log('asd')
			this.chatHistory.splice(this.bottomSheet.message_index , 1)
			setItem({
				key: this.roomDetail.roomId,
				value: this.chatHistory
			})
		},

		closeBottomSheet () {
	      this.bottomSheet.show = false
	    },
	    openBottomSheet (index) {
	    	console.log(index)
	    	Object.assign(this.bottomSheet, {
	    		show: true,
	    		message_index: index
	    	})
	    	console.log(this.bottomSheet)
	    },

		/**
		 * 语音输入
		 */
		voiceEnter() {
			this.$toast('此功能正在加紧开发中~')
		},

		/**
		 * 发送消息
		 */
		send() {
			if(!this.message) return
			let data = {
				senderId: '-1',
				message: this.message,
				header: '/static/header2.jpg'
			}
			this.message = ''
			//1.将消息push到model中
			//2.发送消息到后台,回调如果发送失败将此消息的状态设置为error,将结果存入localStorage
			console.log(this.chatHistory)
			this.chatHistory.push(data)
			setTimeout(()=>{
				this.$set(data, 'error', true)
				setItem({
					key: this.roomDetail.roomId,
					value: this.chatHistory
				})
			}, 2000)
		},

		/**
		 * 发送图片
		 */
		sendImg() {},
	},
}