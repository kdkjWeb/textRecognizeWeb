import {has, getItem , setItem, removeItem, clear} from '@/utils/localStorage'
import Ws from '@/utils/WebSocket'
import betterScroll from 'better-scroll'
import {mapGetters} from 'vuex'
import services from './groupchatServices'

export default {
	data() {
		return {
			hintText: '请输入内容',
			disabled: false,
			shoePhoto: false,
			src: '',
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
			chatHistory: [],
			scroll: null,
		}
	},
	created() {
		this.height = (window.innerHeight-113) + 'px';
		this.height1 = (window.innerHeight) + 'px';
		
		if(Object.keys(this.$route.params).length > 0 && this.$route.params.groupId)
			this.$store.commit('setGroupInfo', this.$route.params)
		//避免从selfChatRoomConfig退回到该页面，无法获取params
		const {groupId, groupName, id} = this.$store.state.groupInfo || this.$route.params

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
		console.log(this.chatHistory)
		// console.log(this.$refs.contentMsg.height)
		this.$nextTick(() => {
	        if(!this.scroll){
		        	this.scroll = new betterScroll(this.$refs['groupChat'], {
		        	click: true
		        })
	        }else{
	        		this.scroll.refresh()
	        }
			//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
	        if(this._getMsgHeight() > 0){
				this.scroll.scrollTo(0,-(this.$refs.content.offsetHeight - parseInt(this.height)));
			}

	    })
		
		
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-113) + 'px';
		})
		this.ban();

		//判断是否被禁言给用户提示
		 /*if(this.$store.state.banValue == undefined){
			this.disabled = true;
			this.hintText ='禁言中'
		 }*/
	},
	computed: {
		...mapGetters({
			user: 'getUser',
			banValue: 'getBan',
			kickOut: 'getKickOut'
		}),
	},
	watch: {
		kickOut(val,oldval){
			if(val){
				this.$toast(val);
				this.$router.push('/index');
			}
		},
		//判断是否被禁言给用户提示
		banValue(val,oldval){
			console.log("修改前卫：" + val);  
            console.log("修改后为：" + oldval); 
			if(val){
				 this.$toast('你已经被禁言！')
				 this.disabled = true;
				 this.hintText ='禁言中'
			 }
		},
		'chatHistory': {
			handler(val){
				//如果发送的消息已经占满屏幕，那么每次发的消息都从底部开始显示
					if(this.scroll && this._getMsgHeight() > 0  && !val[val.length -1].status){
						this._setMsgHeigh()
						.then(height=>{
							this.scroll.scrollTo(0,-height)
							this.scroll.refresh()
					    })
					}
			},
			deep:true,
		}
		
	},
	methods: {
		//是否禁言
		ban(){
			services.Ban({
				Vue: this,
				model: {
					groupId: this.roomDetail.groupId,
					userId: this.$store.state.user.id
				}
			}).then(res=>{
				if(res.block == 1){
					this.disabled = true;
					this.hintText ='禁言中'
				}
			},err=>{
				console.log(err)
			})
		},
		//点击放大图片并弹出放大图片遮罩层
		scale(val){
			this.shoePhoto = true;
			this.src = val
			console.log('点击图片')
		},
		//关闭放大图片遮罩层
		closephoto(){
			this.shoePhoto = false;
		},
		goBack() {
			//如果存在图片则从记录中删除
			for(let i = 0; i < this.chatHistory.length; i++){
				if(this.chatHistory[i].img){
					this.chatHistory.splice(i, 1)
				}
			}
			setItem({
				key: this.roomDetail.groupId,
				value: this.chatHistory
			})
			Ws.close('chat')
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
			//如果是管理员
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
					
					
					//removeItem(this.roomDetail.groupId)
					//this.chatHistory = []
					
					if(this.chatHistory){
						removeItem(this.roomDetail.groupId)
						this.chatHistory = []
						
						//清除聊天记录后重新建立聊天室的websokcet链接
						Ws.connect({
							url: 'groupWs',
							params: {
								groupId: this.roomDetail.groupId,
								msgFrom: this.$store.state.user.username
							},
							model: this.chatHistory,
							connector: this.$store.state.user
						})
						
					}else{
						this.$toast('暂时还没有聊天记录')
					}
					
					
				}
			}else{
				//如果是普通用户
				if(this.dialog){
					
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
						this.$toast(res.msg)
					})
				}else{
					
					if(this.chatHistory){
						removeItem(this.roomDetail.groupId)
						this.chatHistory = []
						
						//清除聊天记录后重新建立聊天室的websokcet链接
						Ws.connect({
							url: 'groupWs',
							params: {
								groupId: this.roomDetail.groupId,
								msgFrom: this.$store.state.user.username
							},
							model: this.chatHistory,
							connector: this.$store.state.user
						})
						
					}else{
						this.$toast('暂时还没有聊天记录')
					}
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
			if(this.disabled){
				this.$toast('你已经被禁言！')
				return;
			}
			if(!this.message) return
			//往后台发送的数据
			let data = {
				groupId: this.roomDetail.groupId,
				username: this.$store.state.user.username,
				message: this.message,
				header: this.$store.state.user.pictureAddress ?
				 'static/headImg/' + this.$store.state.user.pictureAddress + '.jpg' :
				  'static/headImg/6.jpg',
				date: new Date(),
				pictureAddress: this.$store.state.user.pictureAddress,
				nickname: this.$store.state.user.nickname
			}

			this.chatHistory.push(data)



			Ws.send({
				msg: this.message,
				groupId: this.roomDetail.groupId,
				msgFrom: this.$store.state.user.username,
				date: data.date,
				pictureAddress: this.$store.state.user.pictureAddress,
				nickname: this.$store.state.user.nickname
			})

			//发送之后清空输入框内容
			 this.message = ''

			 //到达时间上限检查消息是否发送成功
			 setTimeout(()=>{
			 	for(let i = this.chatHistory.length - 1; i > -1; i-- ){
			 		if(this.chatHistory[i] == data){
			 			//找到这条发送的信息，检查状态是否发送成功
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
			let data = {
				groupId: this.roomDetail.groupId,
				username: this.$store.state.user.username,
				message: this.message,
				header: this.$store.state.user.pictureAddress ?
				 'static/headImg/' + this.$store.state.user.pictureAddress + '.jpg' :
				  'static/headImg/6.jpg',
				date: new Date()
			}

			//clear 
			this.chatHistory.splice(this.bottomSheet.message_index, 1)
			this.bottomSheet = {
				message_index: null,
				show: false,
			}


			this.chatHistory.push(data)

			Ws.send({
				msg: this.message,
				groupId: this.roomDetail.groupId,
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
							key: this.roomDetail.groupId,
							value: this.chatHistory
						})
						break
			 		}
			 	}
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

	     //计算装消息盒子的高度
		_getMsgHeight() {
	 		let MsgHeight = this.$refs.content.offsetHeight - parseInt(this.height) + 57;
	 		return MsgHeight;
		},

		async _setMsgHeigh() {
			await this._getHeight()
			return this.$refs.content.offsetHeight - parseInt(this.height) 
		},
		_getHeight() {
			return new Promise((resolve, reject)=>{
				try{
					let timer = setInterval(()=>{
						if(this.chatHistory.length - 1 == this.$refs.content_main.length -1){
							clearInterval(timer)
							resolve(true)
						}
					},50)
				}catch(e){
					reject(e)
				}
			})
		},
	}
}