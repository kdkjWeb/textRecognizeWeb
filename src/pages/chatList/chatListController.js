import service from './chatListServices'
import { mapGetters } from 'vuex'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			//群聊天室
			groupChatRoomList: [
				// {
				// 	id: '1',
				// 	title: '天王盖地虎',
				// 	url: '/static/header1.jpeg',
				// },
				// {
				// 	id: '2',
				// 	title: '宝塔镇河妖',
				// 	url: '/static/header2.jpg',
				// },
				// {
				// 	id: '3',
				// 	title: '横批:请不要鬼扯',
				// 	url: '/static/header3.jpg',
				// }
			],

			//个人聊天室记录
			selfChatRoomList: [
				{
					id: '1',
					title: 'Maco Mai',
					url: '/static/header1.jpeg',
				},
				{
					id: '2',
					title: 'Mikey',
					url: '/static/header2.jpg',
				},
				{
					id: '3',
					title: 'Makey',
					url: '/static/header3.jpg',
				},
				{
					id: '4',
					title: 'Jerry',
					url: '/static/header1.jpeg',
				},
				{
					id: '5',
					title: 'Tom',
					url: '/static/header2.jpg',
				},
				{
					id: '6',
					title: 'Maco Mai',
					url: '/static/header1.jpeg',
				},
				{
					id: '7',
					title: 'Mikey',
					url: '/static/header2.jpg',
				},
				{
					id: '8',
					title: 'Makey',
					url: '/static/header3.jpg',
				},
				{
					id: '9',
					title: 'Jerry',
					url: '/static/header1.jpeg',
				},
				{
					id: '10',
					title: 'Tom',
					url: '/static/header2.jpg',
				},
			],
		}
	},
	computed:{
		...mapGetters({
			user: 'getUser'
		})
	},
	created() {
		this.height = (window.innerHeight - 112) + 'px'
	},
	mounted() {
		this._fetchGroupList()

		//使用滚动插件
		this.$nextTick(()=>{
			new scroll(this.$refs['chatList'],{
				click: true
			})
		})


		//屏幕发生改变时 
		window.addEventListener('resize',()=>{
			this.height = (window.innerHeight - 112) + 'px'
		})
	},
	methods:{
		enterSelfChatRoom(room) {
			console.log(room)
			const {id: roomId, title} = room
			this.$router.push({
				name: 'SelfChatRoom',
				query: { roomId, title }
			})
		},
		enterGroupChatRoom(room) {
			const {id: roomId, title} = room
			//console.log(roomId, title)
			this.$router.push({
				name: 'GroupChat',
				query: {roomId, title}
			})
		},
		test() {
			console.log(1)
		},
		_fetchGroupList() {
			service.fetchGroupList({
				model: {
					userId: this.$store.state.user.id
				},
				Vue: this,
			})
			.then(res=>{
				console.log(res)
				this.$set(this, 'groupChatRoomList', res)
			}, err=>{
				console.log(err)
			})
		}
	}
}