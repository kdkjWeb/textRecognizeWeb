import services from './selfChatRoomServices'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import betterScroll from 'better-scroll'
import Ws from '@/utils/WebSocket'

export default {
	data() {
		return {
			message: '',//发送的文字消息
			bottomSheet: {//控制底部菜单栏的显示
				message_index: null,
				show: false,
			}, 
			roomDetail: {},
			friendInfo: {},
			chatHistory: []
		}
	},
	created() {
		this.roomDetail = Object.assign({}, this.$route.params)
		console.log(this.$route.params)
		this.friendInfo = this.$route.params
		console.log(this.friendInfo)

		//获取localStorage的聊天历史记录
		const res = getItem(this.roomDetail.roomId)
		this.$set(this, 'chatHistory', res || [])

		this.$nextTick(() => {
	        new betterScroll(this.$refs.wrapper, {
	        	click: true
	        })
	    })

	    //建立聊天室的websokcet链接
		Ws.connect({
			url: 'friendWs',
			params: {
				msgTo: this.$route.params.username,
				msgFrom: this.$store.state.user.username
			},
			model: this.chatHistory,
			connector: this.$store.state.user
		})

	},
	destroyed() {
		// if(Ws !== undefined)
		// 	Ws.close()
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
				username: this.$store.state.user.username,
				message: this.message,
				header: this.$store.state.user.pictureAddress ?
				 '/static/headImg/' + this.$store.state.user.pictureAddress + '.jpg' :
				  '6',
				date: new Date(),
			}
			this.message = ''
			//1.将消息push到model中
			//2.发送消息到后台,回调如果发送失败将此消息的状态设置为error,将结果存入localStorage
			console.log(this.chatHistory)
			this.chatHistory.push(data)

			Ws.send({
				msg: data.message,
				msgTo: this.roomDetail.username,
				msgFrom: this.$store.state.user.username,
				date: data.date
			})

			setTimeout(()=>{
				for(let i = this.chatHistory.length - 1; i > -1; i-- ){
			 		console.log(this.chatHistory[i])
			 		if(this.chatHistory[i] == data){
			 			//找到这条发送的信息，检查状态是否发送成功
			 			console.log(this.chatHistory[i].status)
			 			if(this.chatHistory[i].status != 'success'){
			 				this.$set(data, 'status', 'error')
			 			}
			 			//将聊天记录存入历史localStorage中
			 			setItem({
							key: this.roomDetail.groupId,
							value: this.chatHistory
						})
						break
			 		}
			 	}
			}, 3000)
		},

		/**
		 * 发送图片
		 */
		sendImg() {},

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
	},
}