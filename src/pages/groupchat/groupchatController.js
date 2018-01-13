import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			menuList: ['邀请好友','添加用户','修改资料','踢出成员','清空记录','解散该群'],
			menuIndex: 0,
			isShow: false,
			flag: true,
			roomDetail: {
				title: '',//房间名
				roomId: '',//房间id
			},
			message: '',//发送的文字消息
			height: 0,
			height1: 0,
			chatHistory: [
				{
					senderId: '-1',
					message: '你好呀',
					time: new Date(),
					img: '/static/header1.jpeg',
					header: '/static/header2.jpg'
				},
				{
					senderId: '01',
					message: '萨拉黑哟',
					time: new Date(),
					img: '/static/header3.jpg',
					header: '/static/header3.jpg'
				},
				{
					senderId: '02',
					message: '萨拉黑哟',
					time: new Date(),
					img: '/static/header3.jpg',
					header: '/static/header3.jpg'
				}
			]
		}
	},
	created() {
		this.height = (window.innerHeight-113) + 'px';
		this.height = (window.innerHeight) + 'px';
		this.roomDetail = Object.assign({}, this.$route.query)
		console.log(this.roomDetail.title)

		//获取localStorage的聊天历史记录
		/*const res = getItem(this.roomDetail.roomId)
		console.log(res)
		this.$set(this, 'chatHistory', res)*/
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
			//console.log(this.message,this.roomDetail.roomId)

			//往后台发送的数据
			let data = {
				groupId: this.roomDetail.roomId,
				senderId: '-1',
				message: this.message,
				header: '/static/header2.jpg'
			}

			//发送之后清空输入框内容
			 this.message = ''

		}
	}
}