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
			routeFrom: '',
			scroll: null,
		}
	},
	created() {
		if(Object.keys(this.$route.params).length > 0)
			this.$store.commit('setFriendInfo', this.$route.params)

		//避免从selfChatRoomConfig退回到该页面，无法获取params
		const {nickname, pictureAddress, username} = this.$route.params
		this.friendInfo = Object.keys(this.$route.params).length > 0?
						 {nickname, pictureAddress, username} : 
						 this.$store.state.friendInfo


        //进入聊天室后台自动清除

		Object.assign(this.roomDetail, {
			roomId: this.friendInfo.username + '_' + this.$store.state.user.username,
			title: this.friendInfo.nickname || '暂未设置昵称'
		})
		
		

		//获取localStorage的聊天历史记录

		const res = getItem(this.friendInfo.username + '_' + this.$store.state.user.username )
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
	beforeRouteEnter (to, from, next) {
	  next(vm=>{
	  	vm.routeFrom = from.name
	  })
	},
	mounted() {
		this.$nextTick(() => {
	        this.scroll = new betterScroll(this.$refs.wrapper, {
	        	click: true
	        })

	        if(this._getMsgHeight() > 0){
				this.scroll.scrollTo(0,-(this._getMsgHeight() - 57));
			}

	    })


	},

	watch: {
		'chatHistory': {
			handler(val) {
				//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
				if(this.scroll && this._getMsgHeight() > 0){
					this.scroll.scrollTo(0,-(this._getMsgHeight()));
				}
			},
			deep: true,
		}
	},

	methods: {
		goBack() {
			//退出时将history存入localStorage
			setItem({
				key: this.roomDetail.roomId,
				value: this.chatHistory
			})

			//关闭聊天websocket
			Ws.close('chat')


			if(this.routeFrom == 'SelfChatRoomConfig' || 
				this.routeFrom ==  'FriendsNote'){
				this.$router.push({
					name: 'FriendsList'
				})
			}else{
				this.$router.goBack()
			}
			
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
				header:  this.$store.state.user.pictureAddress,
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
							let arr = getItem('selfRoomList') || []
							for(let elem of Object.values(arr)){
								if(elem.username == this.friendInfo.username)
									return
							}
							arr.push(this.friendInfo)
							setItem({
								key: 'selfRoomList', 
								value: arr
							})
							break
						}
			 		}
			 	}
			}, 1500)

			//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
			if(this._getMsgHeight() > 0){
				this.scroll.scrollTo(0,-(this._getMsgHeight()));
			}
		},

		/**
		 * 发送图片
		 */
		sendImg() {},

		/* 底部菜单栏的事件 */

		/* 重新发送 */
		sendAgain() {

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
						break
			 		}
			 	}
			}, 1500)

			//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
			if(this._getMsgHeight() > 0){
				this.scroll.scrollTo(0,-(this._getMsgHeight()));
			}
		},

		/* 删除 */
		deleteMsg() {
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
	    	Object.assign(this.bottomSheet, {
	    		show: true,
	    		message_index: index
	    	})
	    },

	    //计算装消息盒子的高度
		_getMsgHeight() {
	 		let MsgHeight = this.$refs.content.offsetHeight - parseInt(this.height) + 57;
	 		return MsgHeight;
		},
	},
}