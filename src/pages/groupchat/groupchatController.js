import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import Ws from '@/utils/WebSocket'
import scroll from 'better-scroll'


export default {
	data() {
		return {
			menuList: ['邀请好友','添加用户','修改资料','踢出成员','清空记录','解散该群'],
			menuIndex: 0,
			isShow: false,
			flag: true,
			roomDetail: {
				groupName: '',//房间名
				groupId: '',//房间id
			},
			message: '',//发送的文字消息
			height: 0,
			height1: 0,
			bottomSheet: {//控制底部菜单栏的显示
				message_index: null,
				show: false,
			}, 
			chatHistory: [
				// {
				// 	senderId: '-1',
				// 	message: '你好呀',
				// 	time: new Date(),
				// 	img: '/static/header1.jpeg',
				// 	header: '/static/header2.jpg'
				// },
			]
		}
	},
	created() {
		this.height = (window.innerHeight-113) + 'px';
		this.height1 = (window.innerHeight) + 'px';
		this.roomDetail = Object.assign({}, this.$route.params)

		//获取localStorage的聊天历史记录
		const res = getItem(this.roomDetail.groupId)
		this.$set(this, 'chatHistory', res || [])

		//建立聊天室的websokcet链接
		Ws.connect({
			url: 'groupWs',
			params: {
				groupId: this.roomDetail.groupId,
				msgFrom: this.$store.state.user.username
			},
			model: this.chatHistory,
			connector: this.$store.state.user
		})

		
	},
	mounted() {
		//使用better-scroll添加滚动效果
		this.$nextTick(()=>{
	      new scroll(this.$refs['groupChat'],{
	      	click: true
	      })
	    })
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-113) + 'px';
        })
	},
	destroyed() {
		Ws.close()
	},
	methods: {
		goBack() {
			this.$router.push({
				name: 'ChatList'
			})
		},
		meunItem(index) {
			this.menuIndex = index;
			this.isShow = false;
			this.flag = !this.flag

			//跳转
			switch(index){
				case 0 :
				//邀请好友
				this.$router.push({
					name: 'InviteFriends'
				})
				break;
			}

		},
		menuShow() {
			if(this.flag){
				this.isShow = true;
				this.flag = !this.flag
				console.log(this.flag)
			}else{
				this.isShow = false;
				this.flag = !this.flag
			}
		},
		close() {
			this.isShow = false;
			this.flag = !this.flag
		},
		// 语音聊天
		voiceEnter() {
			this.$toast('此功能正在加紧开发中~')
		},
		//发送图片
		sendImg(){
			this.$toast('此功能正在加紧开发中~')
		},
		//发送聊天消息
		send() {
			if(!this.message) return
			//往后台发送的数据
			let data = {
				groupId: this.roomDetail.groupId,
				username: this.$store.state.user.username,
				message: this.message,
				header: this.$store.state.user.pictureAddress ?
				 '/static/headImg/' + this.$store.state.user.pictureAddress + '.jpg' :
				  '/static/headImg/6.jpg',
				date: new Date()
			}

			this.chatHistory.push(data)



			Ws.send({
				msg: this.message,
				groupId: this.roomDetail.groupId,
				msgFrom: this.$store.state.user.username,
				date: data.date
			})

			//发送之后清空输入框内容
			 this.message = ''

			 //到达时间上限检查消息是否发送成功
			 setTimeout(()=>{
			 	for(let i = this.chatHistory.length - 1; i > -1; i-- ){
			 		console.log(this.chatHistory[i] == data)
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
				key: this.roomDetail.groupId,
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
	}
}