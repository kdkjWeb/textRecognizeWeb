import services from './selfChatRoomServices'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import betterScroll from 'better-scroll'
import Ws from '@/utils/WebSocket'
import {deepClone} from '@/utils/publicFunctions'

export default {
	data() {
		return {
			message: '',//发送的文字消息
			bottomSheet: {//控制底部菜单栏的显示
				message_index: null,
				show: false,
			}, 
			roomDetail: {
				roomId: null, //房间id
				title: null, //房间名
				type: 'self', //房间类型为个人聊天室
			},
			friendInfo: {},
			chatHistory: [],
			height: 0,
		}
	},
	created() {
		console.log(this.$route.params)
		if(Object.keys(this.$route.params).length > 0)
			this.$store.commit('setFriendInfo', this.$route.params)
		this.friendInfo = Object.keys(this.$route.params).length > 0? this.$route.params : this.$store.state.friendInfo

		console.log(this.$store.state.friendInfo)

		Object.assign(this.roomDetail, {
			roomId: this.friendInfo.username + '_' + this.$store.state.user.username,
			title: this.friendInfo.password?
					this.friendInfo.password:
					this.friendInfo.nickname || '暂未设置昵称'
		})
		
		

		//获取localStorage的聊天历史记录
		const res = getItem(this.roomDetail.roomId) ||
					getItem(this.$store.state.user.username + '_' + this.$route.params.username )
		this.$set(this, 'chatHistory', res || [])

		this.height = (window.innerHeight-113) + 'px';

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
	mounted() {
		this.$nextTick(() => {
	        new betterScroll(this.$refs.wrapper, {
	        	click: true
	        })
	    })

	    // 监听窗口改变重置高度
        // window.addEventListener('resize', () => {
        //     this.height = (window.innerHeight-113) + 'px';
        // })
	},
	destroyed() {
		if(Ws)
			Ws.close()
	},

	methods: {
		goBack() {
			//断开socket链接
			this.$router.push({
				name: 'FriendsList'
			})
		},
		enterRoomSetting() {
			this.$router.push({
				name: 'SelfChatRoomConfig',
				params: this.$route.params
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
				header:  this.$store.state.user.pictureAddress || '6',
				date: new Date(),
			}
			this.message = ''
			//1.将消息push到model中
			//2.发送消息到后台,回调如果发送失败将此消息的状态设置为error,将结果存入localStorage

			this.chatHistory.push(data)

			Ws.send({
				msg: data.message,
				msgTo: this.friendInfo.username,
				msgFrom: this.$store.state.user.username,
				date: data.date
			})

			setTimeout(()=>{
				for(let i = this.chatHistory.length - 1; i > -1; i-- ){

			 		if(this.chatHistory[i] == data){
			 			//找到这条发送的信息，检查状态是否发送成功

			 			if(this.chatHistory[i].status != 'success'){
			 				this.$set(data, 'status', 'error')
			 			}
			 			//将聊天记录存入历史localStorage中
			 			setItem({
							key: this.roomDetail.roomId,
							value: this.chatHistory
						})

						//第一次存在历史记录则将room信息放入 个人聊天记录列表中

						if(this.chatHistory.length == 1){

							let arr = getItem('selfRoomList')
							arr.push(this.friendInfo)

							setItem({
								key: 'selfRoomList', 
								value: arr
							})
							break
						}
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
				username: this.$store.state.user.username,
				message: this.chatHistory[this.bottomSheet.message_index].message,
				header:  this.$store.state.user.pictureAddress || '6',
				date: new Date(),
			}

			//clear 
			this.chatHistory.splice(this.bottomSheet.message_index, 1)
			this.bottomSheet = {
				message_index: null,
				show: false,
			}


			this.chatHistory.push(data)
			
			Ws.send({
				msg: data.message,
				msgTo: this.friendInfo.username,
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
							key: this.roomDetail.roomId,
							value: this.chatHistory
						})
						break
			 		}
			 	}
			}, 3000)
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