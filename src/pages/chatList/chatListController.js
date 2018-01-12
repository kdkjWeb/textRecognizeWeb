import service from './chatListServices'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			//群聊天室记录
			groupChatRoomList: [
				{
					id: '1',
					title: '天王盖地虎',
					url: '/static/header1.jpeg',
				},
				{
					id: '2',
					title: '宝塔镇河妖',
					url: '/static/header2.jpg',
				},
				{
					id: '3',
					title: '横批:请不要鬼扯',
					url: '/static/header3.jpg',
				}
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
			],
		}
	},
	computed:{
		...mapGetters({
			user: 'getUser'
		})
	},
	mounted() {
		console.log(this.$store.getters.getUser, this.$store.state.user)
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
	}
}