import {has, getItem , setItem, removeItem} from '@/utils/localStorage'

export default {
	data() {
		return {
			// user: {
			// 	userName: '巴拉巴拉',
			// 	userId: '01',
			// 	userImg: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg',
			// },
			mineLsit: [{
				icon: 'icon-wode',
				color: '#dc8450',
				text: '修改昵称'
			},{
				icon: 'icon-mima',
				color: '#56b048',
				text: '修改密码'
			},{
				icon: 'icon-0039',
				color: '#558fcc',
				text: '修改手机'
			},{
				icon: 'icon-news',
				color: '#d4a426',
				text: '系统消息'
			}]
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	mounted() {
		console.log(this.$store.state.user)
	},
	methods: {
		mineList(index){
			switch(index){
				case 0:
				this.$router.push('/changeName')
				break;
				case 1:
				this.$router.push('/changePassword')
				break;
				case 2:
				this.$router.push('/changephone')
				break;
				case 3:
				this.$router.push('/sysMessageList')
				break;
			}
		},
		changeHeader(val) {
			let data = val
			this.$router.push({name:'ChangeHeader',params:data})
			//console.log(val)
			//this.$router.push({name:'FriendsNote',params:val})
		},
		logout() {
			//消除socket 以及保存的user信息
			removeItem('token')
			this.$router.push({
				name: 'Login'
			})
		}
	}
}