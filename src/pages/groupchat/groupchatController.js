import {has, getItem , setItem, removeItem, clear} from '@/utils/localStorage'
import Ws from '@/utils/WebSocket'
import scroll from 'better-scroll'
import {mapGetters} from 'vuex'
// import services from './groupchatServices'
export default {
	data() {
		return {
			dialog: 0,
			isShow: false,   //右侧菜单显示状态
			isShow1: false,    //确认弹出框状态
			isShow2: false,    //遮罩层状态 
			menuList: ['邀请好友','添加用户','修改资料','踢出成员','清空记录','解散该群'],
			menuList1: ['清空记录','退出该群'],
			flag: true,
			roomDetail: {
				groupName: '',//房间名
				groupId: '',//房间id
				id: ''
			},
			message: '',//发送的文字消息
			height: 0,
			height1: 0,
			bottomSheet: {//控制底部菜单栏的显示
				message_index: null,
				show: false,
			}, 
			chatHistory: []
		}
	},
	created() {
		this.height = (window.innerHeight-113) + 'px';
		this.height1 = (window.innerHeight) + 'px';
		//获取从聊天列表传递过来的数据
		//this.roomDetail = Object.assign({}, this.$route.params)
		//console.log(this.$route.params)
		
		
		if(Object.keys(this.$route.params).length > 0)
			this.$store.commit('setGroupInfo', this.$route.params)
		//避免从selfChatRoomConfig退回到该页面，无法获取params
		const {groupId, groupName, id} = this.$route.params
		this.roomDetail = Object.keys(this.$route.params).length > 0?
						 {groupId, groupName, id} : 
						 this.$store.state.groupInfo
		
		
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
				if(!this.sc){
					this.sc = new scroll(this.$refs['groupChat'],{
						click: true
					})
					 //如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
					if(this.getMsgHeight() > 0){
						this.sc.scrollTo(0,-(this.getMsgHeight()));
					}
				}else{
					this.sc.refresf()
				}
			})
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-113) + 'px';
        })
	},
	computed: {
		...mapGetters({
			user: 'getUser'
		})
	},
	destroyed() {
		Ws.close()
	},
	/*watch: {
		'chatHistory': {
			handler(val){
				//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
					if(this.getMsgHeight() > 0){
						this.sc.scrollTo(0,-(this.getMsgHeight()));
					}
			},
			deep:true,
		}
	},*/
	methods: {
		
		
		//计算装消息盒子的高度
		getMsgHeight() {
		 		var MsgHeight = 0;
		 		MsgHeight = this.$refs.Msg.offsetHeight - parseInt(this.height) + 57;
		 		return MsgHeight;
		 },
		goBack() {
			 this.$router.push({
				name: 'ChatList'
			})
		},
		meunItem(index) {
			this.isShow = false;
			this.flag = !this.flag
			//当是管理员的时候
			if(this.user.type != '0'){
				//跳转
				switch(index){
					case 0 :
					//邀请好友
					this.$router.push({
						name: 'InviteFriends',
						params: this.roomDetail
					})
					break;
					//添加离散用户
					case 1: 
					this.$router.push({
						name: 'DiscreteUserList',
						params: this.roomDetail
					})
					break;
					//修改群资料
					case 2:
					this.$router.push({
						name: 'ChangeGroupInfo',
						params: this.roomDetail
					})
					break;
					//踢出群成员
					case 3:
					this.$router.push({
						name: 'ProposedMembers',
						params: this.roomDetail
					})
					break;
					//清空聊天记录
					case 4: 
					this.dialog = 0
					this.isShow1 = true
					break;
					//确认解散该群
					case 5: 
					this.dialog = 1
					this.isShow1 = true
					break;
				}
			}else{
				//当是普通用户的时候
				switch(index){
					//清空聊天记录
					case 0:
					this.dialog = 0
					this.isShow1 = true
					//this.isShow2 = true
					break;
					//退出该群
					case 1:
					this.dialog = 1
					this.isShow1 = true
					//this.isShow2 = true
					break;
				}
			}
			

		},
		menuShow() {
			if(this.flag){
				this.isShow = true;
				this.isShow2 = true;
				this.flag = !this.flag
			}else{
				this.isShow = false;
				this.isShow2 = false;
				this.flag = !this.flag
			}
		},
		//取消解散该群／取消退出该群
		cancel(){
			this.isShow1 = false;
			this.isShow2 = false;
			this.flag = true;
		},
		//确认操作解散该群／退出该群／清空聊天记录
		success() {
			this.isShow1 = this.isShow2 = false;
			//console.log(this.user.type)
			//判断是普通用户还是管理员
			if(this.user.type != '0'){
				if(this.dialog){
					console.log('确认解散该群')
				
					services.dissolveGroup({
						Vue: this,
						model: {
							groupId: this.$route.params.id,
							userId: this.$store.state.user.id
						}
					}).then(res=>{
						//var data =(new Function("","return "+res))(); 
						//console.log(res)
						if(res.code == 0){
							this.$router.push({
								name: 'ChatList'
							})
						}
					}, err=>{
						console.log(res);
						this.$toast(res.msg)
					})
				}else{
					
					console.log('确认清空聊天记录')
					
					removeItem(this.roomDetail.groupId)
					this.chatHistory = []
				}
			}else{
				//如果是普通用户
				if(this.dialog){
					console.log('确认退出该群')
					
					services.exitGroup({
						Vue: this,
						model: {
							groupId: this.$route.params.id,
							userId: this.$store.state.user.id
						}
					}).then(res=>{
						if(res.code == 0){
							this.$router.push({
								name: 'ChatList'
							})
						}
					},err=>{
						console.log(res);
						this.$toast(res.msg)
					})
				}else{
					console.log('确认清空聊天记录')
					removeItem(this.roomDetail.groupId)
					this.chatHistory = []
				}
			}
			
		},
		close() {
			this.isShow = false;
			if(!this.isShow1){
				this.isShow2 = false;
			}
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