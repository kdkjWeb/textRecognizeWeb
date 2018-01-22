import commonServices from '@/server/commonServices'

export default {
	data() {
		return {
			noteName: '', //备注名
			noteRudece: '',
			userInfo: {//用户信息
				nickname: '', //昵称
				pictureAddress: '',//头像
			},
			status: '', //状态: edit、add
		}
	},
	created() {
		console.log(this.$route.params)
		this.status = this.$route.params.status
		this.userInfo = this.$route.params
		//this.noteName = this.$route.params.nickname
	},
	computed: {
		title() {
			return this.status == 'add'?'添加好友': '修改备注'
		}
	},
	methods: {
		save(){
			console.log(this.userInfo)
			commonServices.fetch({
				url: 'user/modifyRemarkName',
				model: {
					id: this.userInfo.id,
					remarkName: this.noteName
				},
				Vue: this
			})
			.then(res=>{
				console.log(res)
				this.$router.goBack()
			})
		},
		backFriends(){
			this.$router.goBack()
		},
		addFriend() {
			commonServices.fetch({
				url: 'user/addFriend',
				model: {
					id: this.userInfo.id,
					remarkName: this.noteName
				},
				Vue: this
			})
			.then(res=>{
				if(res == '添加好友成功'){
					this.$router.push({
						name: 'SelfChatRoom',
						params: Object.assign(this.userInfo, {
							password: this.noteName
						})
					})
				}
			})
		},
	}
}